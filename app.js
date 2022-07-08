/**
 * Website Javascript
 * 
 * @author Jacob Ota
 */

/**
 * Slide show effect for the intro section
 * 
 */
let slides = new Array('./images/most_mem_bbpic.jpeg', './images/boat.jpg', './images/four_five_punch.JPG', './images/gi_and_me.jpg', './images/clank_helmets.JPG', './images/clay.jpg')
let nextSlide = 0
function slideshow() {
    if(nextSlide >= slides.length) {
        nextSlide = 0;
    }
    let introImage = document.getElementById("welcome");
    introImage.style.backgroundImage = "url(" + slides[nextSlide++] + ")"
    setTimeout(slideshow, 6000)
}
slideshow();
