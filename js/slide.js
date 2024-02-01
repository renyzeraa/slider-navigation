export default class Slide {
  /**
   * @param {HTMLBodyElement} oSlide
   * @param {HTMLBodyElement} oWrapper
   */
  constructor(oSlide, oWrapper) {
    this.slide = oSlide
    this.wrapper = oWrapper
  }

  onStart = oEv => {
    oEv.preventDefault()
    this.wrapper.addEventListener('mousemove', this.onMove)
  }

  onMove = oEv => {
    console.log('moveu')
  }

  onEnd = oEv => {
    console.log('acabou')
    this.wrapper.removeEventListener('mousemove', this.onMove)
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
