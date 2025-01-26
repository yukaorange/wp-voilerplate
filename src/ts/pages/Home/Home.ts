import Page from '@ts/abstract/Page'
import Logger from '@ts/common/utility/Logger'
import GSAP from 'gsap'
import { each } from 'lodash'
import { SwiperOptions } from 'swiper/types'

import SwiperFacade from '@ts/pages/Home/component/SwiperFacade'

import HomeAccordion from '@ts/pages/Home/component/HomeAccordion'
import AccordionProvider from '@ts/common/ui/AccordionProvider'

import HomeTabChanger from '@ts/pages/Home/component/HomeTabChanger'
import TabChangerProvider from '@ts/common/ui/TabChangerProvider'

type TOptions = {
  device: string
}

export default class Home extends Page {
  private swiperFacade: SwiperFacade | null = null
  private accordion_1: HomeAccordion | null = null
  private tabChanger_1: HomeTabChanger | null = null

  constructor(params: TOptions) {
    super({
      id: 'home',
      element: '[data-template="home"]',
      elements: {
        swiper_1: '[data-ui="swiper-1"]',
        accordion_1: '[data-ui="accordion-1"]',
        tabChanger_1: '[data-ui="tab-changer-1"]',
      },
      device: params.device,
    })
  }

  public create() {
    super.create()

    this.swiperCreate()

    // this.accordionCreate()

    // this.tabChangerCreate()
  }

  private swiperCreate() {
    const swiper_options: SwiperOptions = {
      slidesPerView: 'auto',

      autoplay: {
        delay: 3000,
      },

      loop: true,

      freeMode: {
        enabled: false,
      },
    }

    this.swiperFacade = new SwiperFacade(this.elements.swiper_1)

    this.swiperFacade.initialize()

    this.swiperFacade.generate(swiper_options)
  }

  private accordionCreate() {
    this.accordion_1 = new HomeAccordion(this.elements.accordion_1, new AccordionProvider())

    this.accordion_1.initialize()
    this.accordion_1.generate()
  }

  private tabChangerCreate() {
    this.tabChanger_1 = new HomeTabChanger(this.elements.tabChanger_1, new TabChangerProvider())
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

  public onResize(params: { device: string }) {
    super.onResize(params)
  }

  public destroy() {
    super.destroy()
  }
}
