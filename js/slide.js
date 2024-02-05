import debounce from './debounce.js'

export default class Slide {
  /**
   * @param {HTMLBodyElement} oSlide
   * @param {HTMLBodyElement} oWrapper
   */
  constructor(oSlide, oWrapper) {
    this.slide = oSlide
    this.wrapper = oWrapper
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0
    }
    this.activeClass = 'active'
    this.changeEvent = new Event('changeEvent')
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : ''
  }

  isMobileDevice() {
    return (
      'ontouchstart' in window ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    )
  }

  updatePosition(iClientX) {
    this.dist.movement = (this.dist.startX - iClientX) * 1.4
    return this.dist.finalPosition - this.dist.movement
  }

  moveSlide(distX) {
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  onStart = oEv => {
    oEv.preventDefault()
    if (this.isMobileDevice()) {
      this.dist.startX = oEv.changedTouches[0].clientX
    } else {
      this.dist.startX = oEv.clientX
    }
    this.wrapper.addEventListener(
      this.isMobileDevice() ? 'touchmove' : 'mousemove',
      this.onMove
    )
    this.transition(false)
  }

  onMove = oEv => {
    const iPosX = this.isMobileDevice()
      ? oEv.changedTouches[0].clientX
      : oEv.clientX
    const finalPosition = this.updatePosition(iPosX)
    this.moveSlide(finalPosition)
  }

  onEnd = () => {
    this.wrapper.removeEventListener(
      this.isMobileDevice() ? 'touchmove' : 'mousemove',
      this.onMove
    )
    this.dist.finalPosition = this.dist.movePosition
    this.transition(true)
    this.changeSlideOnEnd()
  }

  changeSlideOnEnd = () => {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide()
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide()
    } else {
      this.changeSlide(this.index.active)
    }
  }

  addSlideEvents = () => {
    this.wrapper.addEventListener(
      this.isMobileDevice() ? 'touchstart' : 'mousedown',
      this.onStart
    )
    this.wrapper.addEventListener(
      this.isMobileDevice() ? 'touchend' : 'mouseup',
      this.onEnd
    )
  }

  slidePosition = oSlide => {
    const iMargin = (this.wrapper.offsetWidth - oSlide.offsetWidth) / 2
    return -(oSlide.offsetLeft - iMargin)
  }

  slideConfig = () => {
    this.slideArray = [...this.slide.children].map(oEl => {
      const position = this.slidePosition(oEl)
      return {
        position,
        oEl
      }
    })
  }

  slidesIndexNav = iIndex => {
    const iLast = this.slideArray.length - 1
    this.index = {
      active: iIndex,
      next: iIndex === iLast ? undefined : iIndex + 1,
      prev: iIndex ? iIndex - 1 : undefined
    }
  }

  changeSlide = iIndex => {
    const activeSlide = this.slideArray[iIndex]
    this.moveSlide(activeSlide.position)
    this.slidesIndexNav(iIndex)
    this.dist.finalPosition = activeSlide.position
    this.changeActiveClass()
    this.wrapper.dispatchEvent(this.changeEvent)
  }

  changeActiveClass = () => {
    this.slideArray.forEach(item => item.oEl.classList.remove(this.activeClass))
    this.slideArray[this.index.active].oEl.classList.add(this.activeClass)
  }

  activePrevSlide = () => {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev)
    }
  }

  activeNextSlide = () => {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next)
    }
  }

  onResize = () => {
    this.slideConfig()
    this.changeSlide(this.index.active)
  }

  addResizeEvent = () => {
    debounce(this.onResize, 200)
    window.addEventListener('resize', this.onResize)
  }

  init = () => {
    this.addSlideEvents()
    this.addResizeEvent()
    this.transition(true)
    this.slideConfig()
    this.changeSlide(0)
    return this
  }
}
