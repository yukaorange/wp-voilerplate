import Component from '@ts/abstract/Component'
import AccordionProvider, { TAccordionElements } from '@ts/common/ui/AccordionProvider'

export default class HomeAccordion extends Component {
  private accordion: AccordionProvider

  constructor(element: HTMLElement, accordionProvider: AccordionProvider) {
    super({
      element: element,
      elements: {
        accordionButton: '[data-ui="accordion-button"]',
        accordionContent: '[data-ui="accordion-content"]',
      },
    })

    this.accordion = accordionProvider
  }

  initialize() {
    const accordionElements: TAccordionElements = {
      button: this.elements.accordionButton,
      content: this.elements.accordionContent,
    }

    this.accordion?.initialize(accordionElements)
  }

  generate() {
    this.accordion?.generate()
  }
}
