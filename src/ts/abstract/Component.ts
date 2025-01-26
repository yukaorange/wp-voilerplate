import EventEmitter from 'eventemitter3'
import { each } from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TElement = any //基本的にstringが入ってきて、HTMLElementに変換されるから、anyでいい。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSelector = any //同上
export type TElements = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any //同上
}

export interface ComponentInterface {
  getElement: () => TElement
  getElements: () => TElements
  getInstance: () => Component
}

/**
 * @param {TElement} element
 * @param {TElements} elements
 * this is the base class for all components
 * this can access the parent component
 * this can access the children components
 * this can emit events
 */
export default abstract class Component extends EventEmitter {
  protected selector: TSelector
  protected selectorChildren: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  public element: TElement
  public elements: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }

  constructor({ element, elements }: { element: TElement; elements: TElements }) {
    super()

    this.selector = element

    this.selectorChildren = { ...elements }

    this.element = null

    this.elements = {}

    this.create()
  }

  private create() {
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector
    } else if (typeof this.selector === 'string') {
      this.element = document.querySelector(this.selector) as HTMLElement
    } else {
      this.element = null
    }

    this.elements = {}

    each(this.selectorChildren, (entry: TElement, key: string) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList) {
        this.elements[key] = entry
      } else {
        this.elements[key] = this.element.querySelectorAll(entry) // If more than one element is found, the NodeList remains assigned.

        if (this.elements[key].length === 0) {
          // Handle the number of elements found:
          this.elements[key] = null // If no elements are found, set to null.
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(entry) // If only one element is found, use querySelector to assign it directly.
        }
      }
    })
  }

  public getElement() {
    return this.element
  }

  public getElements() {
    return this.elements
  }

  public getInstance() {
    return this
  }

  public destroy() {}
}
