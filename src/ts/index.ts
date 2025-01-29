import Logger from '@ts/utility/Logger'
import BreakpointsObserver from '@ts/utility/BreakpointsObserver'
import UserAgent from '@ts/utility/UserAgent'
import Preloader, { Loader, Animator } from '@ts/common/Preloader'
import ViewportCalculator from '@ts/utility/ViewportCalculator'
import DrawerNavigation, { DrawerMenu, DrawerButton } from '@ts/common/DrawerNavigation'
import Header, { HeaderScrollObserver, HeaderHeightCalculator } from '@ts/common/Header'
import { Top } from '@ts/pages/Top/Top'
import { PageInterface } from '@ts/abstract/Page'
import { StoreProvider, Store } from '@ts/store/StoreProvider'

class App {
  //information
  private device: string = ''
  private content: HTMLElement
  private template: string | null = ''
  private userAgent: UserAgent | null = null

  //observer
  private viewportCalculator: ViewportCalculator | null = null
  private breakpointsObserver: BreakpointsObserver | null = null

  //store
  private storeProvider: StoreProvider | null = null
  private store: Store | null = null

  //UI layout
  // private preloader: Preloader | null = null
  private drawerNavigation: DrawerNavigation | null = null
  private header: Header | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pages: { [key: string]: PageInterface } = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private page: PageInterface | null = null

  constructor() {
    Logger.enable() //enable or disable

    //content
    this.content = document.querySelector('[data-ui="content"]') as HTMLElement

    {
      /**
       * アプリケーション初期化の流れ
       *
       * （１）テンプレートの特定やビューポートサイズの取得など、ベースになる情報を作成
       * （２）基本的なUIパーツの作成
       * （３）コンポーネントを跨いで共有する情報をstoreに格納
       * （４）ページコンポーネントの作成
       * （５）イベントリスナの作成
       * （６）ページを表示
       */
    }

    //information provider
    this.identifyTemplate()
    this.createUserAgentInformer()
    this.createBreakPointObserver()
    this.createViewportCalculator()

    //init layout parts
    // this.createPreloader()
    this.createDrawerNavigation()
    this.createHeaderUI()

    //store
    this.createStore()

    //pages
    this.createPages()

    //events
    this.createEvents()

    //app start
    this.start()
  }

  private identifyTemplate() {
    this.template = this.content.getAttribute('data-template') as string

    Logger.log(`from App.ts / template: ${this.template} | content: ${this.content}`)
  }

  private createUserAgentInformer() {
    this.userAgent = new UserAgent({
      body: document.body,
    })

    Logger.log(`from App.ts / this.userAgent:`, this.userAgent.getData())
  }

  private createBreakPointObserver() {
    const indicator = document.querySelector('[data-ui="indicator"]') || null


    const breakpoints = {
      sp: 768,
    }

    this.breakpointsObserver = new BreakpointsObserver({
      breakpoints: breakpoints,
      indicator: indicator,
    })

    this.device = this.breakpointsObserver.getCurrentDevice() as string

  }

  // private createPreloader() {
  //   const loader = new Loader()
  //   const animator = new Animator()

  //   this.preloader = new Preloader(loader, animator)
  // }

  private createDrawerNavigation() {
    const button = new DrawerButton()
    const menu = new DrawerMenu()

    this.drawerNavigation = new DrawerNavigation(button, menu)
  }

  private createHeaderUI() {
    const headerScrollObserver = new HeaderScrollObserver()

    const headerHeightCalculator = new HeaderHeightCalculator()

    this.header = new Header(headerScrollObserver, headerHeightCalculator)

    this.header.onResize()
  }

  private createViewportCalculator() {

    this.viewportCalculator = new ViewportCalculator()

    this.viewportCalculator.onResize()

  }

  private createPages() {

    this.pages = {
      top: new Top(),
    }

    this.page = this.pages[this.template ?? '']

    this.page?.create()

  }

  /**
   * events
   */

  private onResize() {
    //detect device
    this.breakpointsObserver?.resize()

    const device = this.breakpointsObserver?.getCurrentDevice() as string

    this.device = device

    //update store
    this.store?.setState('device', device)

    this.store?.setState('viewport', {
      width: window.innerWidth,
      height: window.innerHeight,
    })


    //detect header height
    this.header?.onResize()

    //detect viewport
    this.viewportCalculator?.onResize()


    Logger.log(`from App.ts:onResize() => resized`)
  }

  private onScroll() {
    this.header?.onScroll()
  }

  /**
   * events
   */
  createEvents() {

    window.addEventListener('resize', () => {
      this.onResize()
    })

    window.addEventListener('scroll', () => {
      this.onScroll()
    })

  }

  /**
   * store
   * (ページの状態を管理、MPAでは使う場面は少なそうだけど念のため、用意している。)
   */
  createStore() {

    this.storeProvider = StoreProvider.getInstance()

    this.storeProvider.createStore('app', {
      device: this.breakpointsObserver?.getCurrentDevice() as string,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    })

    this.store = this.storeProvider.getStore('app') ?? null
  }

  /**
   * init
   */
  private start() {

    this.page?.set()

    // this.preloader?.once('loaded', async () => {
    //   await this.preloader?.hideAnimation()

    //   this.update()

    //   this.preloader?.destroy()
    // })

    this.page?.show()

    this.onResize()

    Logger.log('from App.ts / page started')

  }
}

window.addEventListener('load', () => {
  new App()
})
