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

  updatePosition(iClientX) {
    this.dist.movement = (this.dist.startX - iClientX) * 1.3
    return this.dist.finalPosition - this.dist.movement
  }

  moveSlide(distX) {
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  onStart = oEv => {
    oEv.preventDefault()
    this.dist.startX = oEv.clientX
    this.wrapper.addEventListener('mousemove', this.onMove)
  }

  onMove = oEv => {
    const finalPosition = this.updatePosition(oEv.clientX)
    this.moveSlide(finalPosition)
  }

  onEnd = oEv => {
    this.wrapper.removeEventListener('mousemove', this.onMove)
    this.dist.finalPosition = this.dist.movePosition
  }

  addSlideEvents = () => {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onEnd)
  }

  init = () => {
    this.addSlideEvents()
    return this
  }
}
