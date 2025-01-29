import Component from '@ts/abstract/Component'
// import Logger from '@ts/utility/Logger'

export default class Header {
  private scrollObserver: HeaderScrollObserverOptions
  private heightCalculator: THeaderHeightCalculator

  constructor(
    scrollObserver: HeaderScrollObserverOptions,
    heightCalculator: THeaderHeightCalculator
  ) {
    this.heightCalculator = heightCalculator

    this.scrollObserver = scrollObserver

    const height = this.heightCalculator.getHeaderHeight()

    this.scrollObserver.setQuantity(height)
  }

  onScroll() {
    this.scrollObserver.onScroll()
  }

  onResize() {
    this.heightCalculator.onResize()

    const height = this.heightCalculator.getHeaderHeight()

    this.scrollObserver.onResize(height)
  }
}

/**
 * scroll observer
 */
type HeaderScrollObserverOptions = {
  onScroll: () => void
  onResize: (height: number) => void
  setQuantity: (quantity: number) => void
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

    this.monitoredQuantity = 100
  }

  onScroll() {
    const scrollPosition = window.scrollY

    if (this.monitoredQuantity < scrollPosition) {
      this.element.classList.add('scrolled')
    } else {
      this.element.classList.remove('scrolled')
    }
  }

  onResize(quantity: number) {
    this.setQuantity(quantity)
  }

  setQuantity(quantity: number) {
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
