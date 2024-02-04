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
  }

  init = () => {
    this.addSlideEvents()
    this.slideConfig()
    return this
  }
}
