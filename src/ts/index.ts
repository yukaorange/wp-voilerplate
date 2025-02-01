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
    this.identifyTemplate()//現在のページを特定
    this.createViewportCalculator()//ビューポートのサイズを取得する
    this.createUserAgentInformer()//UAを取得
    this.createBreakPointObserver()//BPを設定

    //init layout parts
    // this.createPreloader()
    this.createDrawerNavigation()//ドロワーナビゲーションのUIを構築
    this.createHeaderUI()//ヘッダーUIを構築

    //store
    this.createStore()// (ページの状態を管理、MPAでは使う場面は少なそうだけど念のため、用意している。)

    //pages(ページの選択肢を管理)
    this.createPages()//ページの作成（=>ページ独自の実装はこのメソッド配下に存在）

    //events（イベントを登録。原則、リサイズとスクロール）
    this.createEvents()

    //app start（ページの表示）
    this.start()

  }


  /**
   * テンプレートの特定
   */
  private identifyTemplate() {
    this.template = this.content.getAttribute('data-template') as string

    Logger.log(`from App.ts / template: ${this.template} | content: ${this.content}`)
  }

  /**
   * UAの取得
   */
  private createUserAgentInformer() {

    this.userAgent = new UserAgent({
      body: document.body,
    })

    Logger.log(`from App.ts / this.userAgent:`, this.userAgent.getData())

  }

  /**
   * スクリプト内部で使用可能なBPを設定
   */
  private createBreakPointObserver() {

    const indicator = document.querySelector('[data-ui="indicator"]') || null

    const breakpoints = {
      sp: 768,
    }

    this.breakpointsObserver = new BreakpointsObserver({
      breakpoints: breakpoints,
      indicator: indicator,
    })

  }

  // private createPreloader() {
  //   const loader = new Loader()
  //   const animator = new Animator()

  //   this.preloader = new Preloader(loader, animator)
  // }


  /**
   * ドロワーナビのUIを構築
   */
  private createDrawerNavigation() {

    const button = new DrawerButton()
    const menu = new DrawerMenu()

    this.drawerNavigation = new DrawerNavigation(button, menu)

  }

  /**
   * ヘッダーのUIを構築
   */
  private createHeaderUI() {

    const headerScrollObserver = new HeaderScrollObserver()

    const headerHeightCalculator = new HeaderHeightCalculator()

    this.header = new Header(headerScrollObserver, headerHeightCalculator)

  }

  private createViewportCalculator() {

    this.viewportCalculator = new ViewportCalculator()

  }


  /**
   * ページ一覧と、現在のページ独自のUIを構築
   */
  private createPages() {

    this.pages = {
      top: new Top(),
    }

    this.page = this.pages[this.template ?? '']

    this.page?.create()
  }

  /**
   * events(Appにおける各種イベント発火時のメソッド)
   */
  private onResize() {
    //update store(MPAでは必要性ほぼない)
    this.device = this.breakpointsObserver?.getCurrentDevice() as string
    this.store?.setState('device', this.device)
    this.store?.setState('viewport', {
      width: window.innerWidth,
      height: window.innerHeight,
    })


    Logger.log(`from App.ts:onResize() => resized`)
  }

  private onScroll() { }

  /**
   * イベントリスナーの初期化
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
   * ページの表示
   */
  private start() {
    //デバイスの特定
    this.device = this.breakpointsObserver?.getCurrentDevice() as string

    /**
     * ページを待機させて、プリロードUIの動作終了後にページ表示アニメーションに移行させるロジック
     */
    //ページUIの表示待機
    this.page?.set()

    // this.preloader?.once('loaded', async () => {
    //   await this.preloader?.hideAnimation()

    //   this.update()

    //   this.preloader?.destroy()
    // })

    //ページUIの表示
    this.page?.show()

    this.onResize()

    Logger.log('from App.ts / page started')

  }
}

window.addEventListener('load', () => {

  new App()

})
