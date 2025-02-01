import GSAP from 'gsap'

import Component from '@ts/abstract/Component'
import Logger from '@ts/utility/Logger'
import Page from '@ts/abstract/Page'

/**
 * Asset Loader
 */
interface ILoader {
  loadAssets(assets: HTMLImageElement[], indicator: HTMLElement): Promise<void>
}

export class Loader implements ILoader {

  private loadedCount: number = 0
  private totalAssets: number = 0

  public async loadAssets(assets: HTMLImageElement[], indicator: HTMLElement): Promise<void> {

    return new Promise((resolve, reject) => {

      this.totalAssets = assets.length

      /**
       * 画像がない場合は即resolveする
       */
      if (this.totalAssets === 0) {

        resolve()
        return

      }


      assets.forEach((image) => {

        /**
         * 画像が読み込み済みの場合は即resolveする
         */
        if (image.complete) {
          this.onAssetLoaded(indicator, resolve)
          return
        }

        /**
         * 画像が読み込み中の場合はloadイベントを待つ
         */
        image.onload = () => this.onAssetLoaded(indicator, resolve)

        image.onerror = (e) => {
          Logger.error(`Failed to load ${image.src}`)
          reject(e)
        }

      })
    })
  }

  /**
   * 各画像の読み込み完了時の処理
   */
  private onAssetLoaded(indicator: HTMLElement, resolve: () => void): void {

    this.loadedCount++

    const percent = (this.loadedCount / this.totalAssets) * 100

    this.updateLoadingProgress(indicator, percent)

    if (this.loadedCount === this.totalAssets) {
      resolve()
    }

  }

  /**
   * 画像読み込み進捗の表示を更新する
   */
  private updateLoadingProgress(indicator: HTMLElement, percent: number): void {

    const hundreds = Math.floor(percent / 100)
    const tens = Math.floor((percent / 10) % 10)
    const ones = Math.floor(percent % 10)

    const updateDigit = (selector: string, value: number) => {

      const element = indicator.querySelector(selector) as HTMLElement

      if (element) {
        element.style.setProperty('--progress', value.toString())
      }

    }

    updateDigit('[data-ui="preloader-count-digit-hundred"]', hundreds)
    updateDigit('[data-ui="preloader-count-digit-ten"]', tens)
    updateDigit('[data-ui="preloader-count-digit-one"]', ones)

  }
}

/**
 * Loading Animation Controller
 */
interface IAnimator {
  hidePreloader(element: HTMLElement): Promise<void>
}

export class Animator implements IAnimator {
  public hidePreloader(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      GSAP.to(element, {
        autoAlpha: 0,
        duration: 1,
        ease: 'power2.out',
        onUpdate: function () {
          if (this.progress() > 0.8) {
            resolve()
          }
        }
      })
    })
  }
}

/**
 * Main Preloader Component
 */
export default class Preloader extends Component {
  private loader: ILoader
  private animator: IAnimator
  private page: Page

  constructor(page: Page, loader: ILoader, animator: IAnimator) {

    super({
      element: '[data-ui="preloader"]',
      elements: {
        count: '[data-ui="preloader-count"]',
      },
    })

    this.page = page
    this.loader = loader
    this.animator = animator

  }

  private isTopPage(): boolean {
    return this.page.id === 'top'
  }

  /**
   * ロード処理→プリローダー非表示アニメーション→プリローダー削除
   */
  public async load(): Promise<void> {

    if (!this.isTopPage()) {
      this.destroy()
      return
    }

    try {

      const assets: HTMLImageElement[] = Array.from(document.querySelectorAll('img'))

      const indicator = this.elements.count as HTMLElement

      await this.loader.loadAssets(assets, indicator)

      await this.animator.hidePreloader(this.element)

      this.destroy()

    } catch (error) {

      Logger.error('Preloader error:', error)
      throw error

    }
  }

  public destroy(): void {

    if (this.element.parentNode) {

      this.element.parentNode.removeChild(this.element)

    }

    Logger.log('Preloader destroyed')

  }
}