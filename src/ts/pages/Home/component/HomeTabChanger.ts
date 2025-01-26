import Component from '@ts/abstract/Component'
import TabChangerProvider from '@ts/common/ui/TabChangerProvider'

export default class HomeTab extends Component {
  private tabChanger: TabChangerProvider

  constructor(element: HTMLElement, tabChangerProvider: TabChangerProvider) {
    super({
      element: element,
      elements: {
        tabButton: '[data-tab-target]',
        tabContent: '[data-tab-content]',
      },
    })

    this.tabChanger = tabChangerProvider

    this.initialize()
  }

  private initialize() {
    const element = this.element

    const buttons = this.elements.tabButton

    const contents = this.elements.tabContent

    this.tabChanger.initialize(element, buttons, contents)

    console.log(buttons)

    buttons.forEach((button: HTMLElement, index: number) => {
      this.tabChanger.setupButton(button, index)
    })

    contents.forEach((content: HTMLElement, index: number) => {
      this.tabChanger.setupContent(content, index)
    })
  }
}
