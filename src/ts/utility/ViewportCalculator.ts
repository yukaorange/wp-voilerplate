import Logger from '@ts/utility/Logger'

export default class ViewPortCalculator {
  private vw: number
  private documentWidth: number
  private scrollBarWidth: number
  private ajustWidth: number

  constructor() {
    this.vw = window.innerWidth

    this.documentWidth = document.documentElement.clientWidth

    this.scrollBarWidth = this.vw - this.documentWidth

    this.ajustWidth = this.vw - this.scrollBarWidth

    this.addEventListener()

    this.onResize()
  }

  public onResize() {

    this.vw = window.innerWidth

    this.documentWidth = document.documentElement.clientWidth

    this.scrollBarWidth = this.vw - this.documentWidth

    this.ajustWidth = this.vw - this.scrollBarWidth

    this.updateViewPortWidth()

  }

  private updateViewPortWidth() {

    document.documentElement.style.setProperty('--vw', `${this.ajustWidth}px`)

  }

  public getAjustedWidth() {

    Logger.log(`from ViewPortCalculator.ts /ajustWidth:${this.ajustWidth}px`)

    return this.ajustWidth

  }

  public getWitdh() {//ほぼ使わない。adjustedWidthを使うことを推奨。

    return this.vw

  }

  private addEventListener() {

    window.addEventListener('resize', () => {

      this.onResize()
      
    })

  }
}
