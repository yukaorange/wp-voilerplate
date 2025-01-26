import SwiperProvider, { TSwiperElements } from '@ts/common/ui/swiper/SwiperProvider'

import CreateSwiperElements from '@ts/common/ui/swiper/CreateSwiperElements'
import { SwiperOptions } from 'swiper/types'

export default class swiperFacade {
  private swiperProvider: SwiperProvider
  private swiperElements: CreateSwiperElements

  constructor(element: HTMLElement) {
    this.swiperElements = new CreateSwiperElements(element)

    this.swiperProvider = new SwiperProvider()
  }

  public initialize() {
    const swiperElements: TSwiperElements = {
      element: this.swiperElements.getElement(),

      slide: this.swiperElements.getSlides(),

      buttonPrev: this.swiperElements.getButtonPrev(),

      buttonNext: this.swiperElements.getButtonNext(),

      indicator: this.swiperElements.getIndicator(),
    }

    this.swiperProvider?.initialize(swiperElements)
  }

  public generate(options: SwiperOptions) {
    this.swiperProvider?.generate(options)
  }
}
