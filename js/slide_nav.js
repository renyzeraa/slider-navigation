import Slide from './slide.js'

export default class SlideNav extends Slide {
  /**
   * @param {HTMLElement} prev
   * @param {HTMLElement} next
   */
  addArrow = (prev, next) => {
    this.prevElement = document.querySelector(prev)
    this.nextElement = document.querySelector(next)
    this.addArrowEvent()
  }

  addArrowEvent = () => {
    this.prevElement.addEventListener('click', this.activePrevSlide)
    this.nextElement.addEventListener('click', this.activeNextSlide)
  }

  createControl = () => {
    const control = document.createElement('ul')
    control.dataset.control = 'slide'
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index}">${index + 1}</a></li>`
    })
    this.wrapper.appendChild(control)
    return control
  }

  /**
   * @param {HTMLElement} item
   * @param {Integer} index
   */
  eventControl = (item, index) => {
    item.addEventListener('click', event => {
      event.preventDefault()
      this.changeSlide(index)
      this.changeActiveClass()
    })
    this.wrapper.addEventListener('changeEvent', this.activeControlItem)
  }

  addControlEvent = customControl => {
    this.control = document.querySelector(customControl) || this.createControl()
    this.controlArray = [...this.control.children]
    this.controlArray.forEach(this.eventControl)
    this.activeControlItem()
  }

  activeControlItem = () => {
    this.controlArray.forEach(item => item.classList.remove(this.activeClass))
    this.controlArray[this.index.active].classList.add(this.activeClass)
  }
}
