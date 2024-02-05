// import Slide from './slide.js'
import SlideNav from './slide_nav.js'

const slide = document.querySelector('.slide')
const wrapper = document.querySelector('.slide-wrapper')

const oSlide = new SlideNav(slide, wrapper)
oSlide.init()
oSlide.addArrow('.prev', '.next')
oSlide.addControlEvent()
