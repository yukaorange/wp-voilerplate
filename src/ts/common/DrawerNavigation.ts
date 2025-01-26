import Component, { TElements, TElement } from '@ts/abstract/Component'

export default class DrawerNavigation {
  private button: DrawerButtonInterface
  private menu: DrawerMenuInterface

  constructor(button: DrawerButtonInterface, menu: DrawerMenuInterface) {
    this.button = button
    this.menu = menu
    this.initializeEventHandlers()
  }

  initializeEventHandlers() {
    this.button.addClickHandler(() => this.handleDrawerToggle())
    this.menu.addLinkClickHandler(() => this.handleDrawerToggle())
    this.menu.addCloseClickHandler(() => this.handleDrawerToggle())
    this.menu.addOverlayClickHandler(() => this.handleDrawerToggle())
  }

  private handleDrawerToggle() {
    const state = !this.button.getIsExpanded()

    this.updateState(state)
  }

  private updateState(isExpanded: boolean) {
    this.button.updateState(isExpanded)
    this.menu.updateState(isExpanded)
  }
}

/**
 * button
 */
type DrawerButtonOption = {
  element: TElement
  elements: TElements
  isExpanded: boolean
}
interface DrawerButtonInterface {
  updateState: (isExpanded: boolean) => void
  getIsExpanded: () => boolean
  addClickHandler: (handler: () => void) => void
}

export class DrawerButton extends Component implements DrawerButtonOption {
  public isExpanded: boolean

  constructor() {
    super({
      element: '[data-ui="button-drawer"]',
      elements: {
        textMenu: '[data-ui="button-drawer-text-menu"]',
        textClose: '[data-ui="button-drawer-text-close"]',
      },
    })

    this.isExpanded = false

    this.element?.setAttribute('aria-expanded', 'false')

    this.updateState(this.isExpanded) //初期化時はfalse
  }

  public updateButtonText(isExpanded: boolean) {
    const { textMenu, textClose } = this.elements

    textMenu.classList.toggle('active', !isExpanded)

    textClose.classList.toggle('active', isExpanded)
  }

  public updateState(isExpanded: boolean) {
    this.isExpanded = isExpanded

    this.element.setAttribute('aria-expanded', String(isExpanded))

    this.element.classList.toggle('active', isExpanded)

    this.updateButtonText(isExpanded)
  }

  public addClickHandler(handler: () => void) {
    this.element.addEventListener('click', handler)
  }

  public getIsExpanded() {
    return this.isExpanded
  }
}

/**
 * menu
 */
type DrawerMenuOption = {
  element: TElement
  elements: TElements
}

interface DrawerMenuInterface {
  updateState: (isExpanded: boolean) => void
  addLinkClickHandler: (handler: () => void) => void
  addCloseClickHandler: (handler: () => void) => void
  addOverlayClickHandler: (handler: () => void) => void
}

export class DrawerMenu extends Component implements DrawerMenuOption {
  constructor() {
    super({
      element: '[data-ui="nav-drawer"]',
      elements: {
        inner: '[data-ui="nav-drawer-inner"]',
        list: '[data-ui="list-drawer-nav"]',
        item: '[data-ui="item-drawer-nav"]',
        link: '[data-ui="item-nav-drawer-link"]',
        // close: '[data-ui="close-drawer"]',
      },
    })

    this.element.setAttribute('aria-hidden', 'true')
  }

  public updateState(isExpanded: boolean) {
    this.element.setAttribute('aria-hidden', String(!isExpanded))

    this.element.classList.toggle('active', isExpanded)
  }

  public addLinkClickHandler(handler: () => void) {
    this.elements.link.forEach((link: HTMLElement) => {
      link.addEventListener('click', handler)
    })
  }

  public addCloseClickHandler(handler: () => void) {
    this.elements.close?.addEventListener('click', handler)
  }

  public addOverlayClickHandler(handler: () => void) {
    this.elements.inner.addEventListener('click', (e: Event) => {
      if (e.target === this.elements.inner) {
        handler()
      }
    })
  }
}
