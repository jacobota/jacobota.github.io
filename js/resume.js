/**
 * Website Javascript Resume Page
 *  
 * @author Jacob Ota
 */
const header = document.getElementById("header");
const elem = document.getElementsByClassName("navbar")[0];

const list = elem.children[0].children;
console.log(list);

//put an eventlistener on all of the list elements
for(let i = 0; i < list.length; i++) {
    if(list[i].textContent.toLowerCase() != "resume") {
        let myUrl = "";
    list[i].addEventListener("click", (e) => {
        if(list[i].textContent.toLowerCase() != "home") {
            myUrl = `../pages/${list[i].textContent.toLowerCase()}.html`;
        } else {
            myUrl = "../index.html";
        }
        header.animate(headerAnimation, headerDuration);
        header.style.transform = "translateY(-100%)";
        setTimeout(() => {
            document.location.href = myUrl;
        },1500)
    })
    }
}

const headerAnimation = [
    {transform : "translateY(0%)"},
    {transform : "translateY(-100%)"}   
]

const headerDuration = {
    duration: 1000,
    iterations: 1
}

//scroll on slide animation
window.addEventListener("scroll", () => {
    var sections = document.getElementsByClassName('section');
    
    for(let i = 0; i < sections.length; i++) {
        let height = window.innerHeight;
        let sectionTop = sections[i].getBoundingClientRect().top;
        let revealSection = 150;

        if(sectionTop < height - revealSection) {
            sections[i].classList.add('revealed');
        } else {
            sections[i].classList.remove('revealed');
        }
    }
})