import Component from '@ts/abstract/Component'
import Logger from '@ts/utility/Logger'

export default class Header {

  private scrollObserver: HeaderScrollObserverOptions
  private heightCalculator: THeaderHeightCalculator

  constructor(
    scrollObserver: HeaderScrollObserverOptions,
    heightCalculator: THeaderHeightCalculator
  ) {

    this.heightCalculator = heightCalculator

    this.scrollObserver = scrollObserver

    this.addEventListeners()

    this.onResize()

  }


  private setScrollObserverQuantity() {
    /**
     * スクロール量に応じてヘッダーのスタイルを変更するための閾値をHeaderScrollObserverに設定する
     */
    const height = this.heightCalculator.getHeaderHeight()

    Logger.log(`from Header.ts:setScrollObserverQuantity() => height:${height}`)

    this.scrollObserver.setQuantity(height)

  }


  onScroll() {

    this.scrollObserver.onScroll()

  }

  onResize() {

    this.heightCalculator.onResize()

    this.setScrollObserverQuantity()

  }

  addEventListeners() {

    window.addEventListener('scroll', () => {

      this.onScroll()

    })

    window.addEventListener('resize', () => {

      this.onResize()

    })

  }
}

/**
 * scroll observer
 */
type HeaderScrollObserverOptions = {
  setQuantity: (quantity: number) => void
  onScroll: () => void
  onResize: () => void
}

export class HeaderScrollObserver extends Component {
  private monitoredQuantity: number

  constructor() {

    super({
      element: '[data-ui="header"]',
      elements: {
        logo: '[data-ui="header-Logo"]',
        nav: '[data-ui="global-nav"]',
      },
    })

    this.monitoredQuantity = 0//初期値（Header初期化時にsetされる）

  }

  public onScroll() {
    /**
     * スクロール量が閾値を超えたら、ヘッダーにスタイルを付与する
     */
    const scrollPosition = window.scrollY

    if (this.monitoredQuantity < scrollPosition) {
      this.element.classList.add('scrolled')
    } else {
      this.element.classList.remove('scrolled')
    }

  }

  public onResize() {
  }

  public setQuantity(quantity: number) {

    this.monitoredQuantity = quantity

  }
}

/**
 * header height calculator
 */

type THeaderHeightCalculator = {
  onResize: () => void
  getHeaderHeight: () => number
}

export class HeaderHeightCalculator extends Component {
  private headerHeight: number

  constructor() {

    super({
      element: '[data-ui="header"]',
      elements: {},
    })

    this.headerHeight = this.element.offsetHeight

  }

  private calcHeaderHeight() {

    this.headerHeight = this.element.offsetHeight

  }

  private setHeaderHeight() {
    /**
     * ヘッダーの高さをグローバルなCSS変数にセットする
     */
    document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`)

  }

  public onResize() {

    this.calcHeaderHeight()

    this.setHeaderHeight()

  }

  public getHeaderHeight() {

    return this.headerHeight

  }
}
