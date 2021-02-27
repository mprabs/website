const mainImage = document.getElementById('main-image')
const timeline = document.getElementById('toTimeline')
const works = document.getElementById('toWorks')
const description = document.getElementById('description')
const front_details = document.getElementById('front__details')
const after_content = document.getElementById('after_content')
const bar = document.getElementById('bar')
const menu = document.getElementById('menu')

bar.addEventListener ('click', () => {
    bar.classList.toggle('open')
    if(bar.classList.contains('open')) {
        menu.classList.add('change-opacity')
    } else {
        menu.classList.remove('change-opacity')
    }
})

timeline.addEventListener('click', showContent)
works.addEventListener('click', showContent)

function showContent() {
  mainImage.classList.toggle('image__expand')
  description.style.display = 'none'
  front_details.classList.add('transparent__background')
  after_content.style.display = 'block'
  front_details.classList.remove('translation')
}

mainImage.addEventListener('mouseover', () => {
    if(mainImage.classList.contains('image__expand')) {
        mainImage.style.cursor = 'pointer';
    }
})

mainImage.addEventListener('click', () => {
    if(mainImage.classList.contains('image__expand')) {
        after_content.style.display = 'none'
        mainImage.classList.remove('image__expand')
        description.style.display = 'block'
        front_details.classList.remove('transparent__background')
        front_details.classList.add('translation')
    }
})