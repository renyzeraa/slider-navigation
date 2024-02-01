import Slide from './slide.js'

const slide = document.querySelector('.slide')
const wrapper = document.querySelector('.slide-wrapper')

const oSlide = new Slide(slide, wrapper)
oSlide.init()
