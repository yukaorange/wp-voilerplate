type Options = {
  breakpoints: { sp: number }
  indicator: Element | null
}

/**
 * @param {}
 * @//return,type {}
 */

export default class BreakpointsObserver {
  private currentDevice: string = ''
  private breakpoints: Options['breakpoints']
  private body: HTMLElement
  private indicator?: Options['indicator']

  constructor({ breakpoints, indicator }: Options) {
    this.breakpoints = breakpoints
    this.indicator = indicator

    this.body = document.querySelector('body') as HTMLElement

    this.init()
  }

  private detectViewport(viewPortWidth: number) {
    this.body.dataset.viewport = this.determineDeviceType(viewPortWidth)

    this.currentDevice = this.determineDeviceType(viewPortWidth)
  }

  private determineDeviceType(width: number) {
    if (width <= this.breakpoints.sp) {
      return 'sp'
    } else {
      return 'desktop'
    }
  }

  private init() {
    const viewPortWidth = window.innerWidth

    this.detectViewport(viewPortWidth)
  }

  public resize() {
    const viewPortWidth = window.innerWidth

    this.detectViewport(viewPortWidth)
  }

  public getCurrentDevice() {
    return this.currentDevice
  }
}
