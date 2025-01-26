import Logger from '@ts/utility/Logger'
import Page from '@ts/abstract/Page'
import { StoreProvider, Store } from '@ts/store/StoreProvider'

import { ResourceLoader } from './ResourceLoader'
// import GSAP from 'gsap'

export class Top extends Page {
  private unsubscribe: () => void
  private resourceLoader = new ResourceLoader()
  private store: Store
  private viewportWidth: number = 0

  constructor() {
    const store = StoreProvider.getGlobalStore('app')
    if (!store) {
      throw new Error('Store "app" not found')
    }

    super({
      id: 'top',
      element: '[data-template="top"]',
      elements: {},
      device: store.getState().device,
    })

    this.store = store

    this.unsubscribe = this.store.subscribe((state) => {
      const { width } = state.viewport

      this.viewportWidth = width
      // Logger.log(`from Top.ts:constructor() => width: ${width}, height: ${height}`)
    })
  }

  public create() {
    super.create()

    this.resourceLoader?.init()
  }

  /**
   * animation
   */
  public set() {
    super.set()
  }

  public show() {
    super.show()
  }

  public async hide() {
    await super.hide()
  }

  public onResize() {
    //publicに定義しているが、今回のプロジェクトではprivateでのみ使用している。

    super.onResize()
  }

  public destroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }

    this.resourceLoader?.destroy()

    super.destroy()
  }
}
