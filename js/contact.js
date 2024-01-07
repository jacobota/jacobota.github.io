/**
 * Website Javascript Contact Page
 * 
 * @author Jacob Ota
 */
const header = document.getElementById("header");
const elem = document.getElementsByClassName("navbar")[0];

const list = elem.children[0].children;

//put an eventlistener on all of the list elements
for(let i = 0; i < list.length; i++) {
    if(list[i].textContent.toLowerCase() != "contact") {
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

//Picture Image Track Slider Functionality
//Inspiration from Hyperplexed Youtube Channel

const container = document.getElementById("picture-slider-container")
const track = document.getElementById("image-track")

container.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

container.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

container.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") {return;}

    const mouseChange = parseFloat(track.dataset.mouseDownAt) - e.clientX
    const maxChange = window.innerWidth / 2;

    const percentage = (mouseChange / maxChange) * -100
    const continuePercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(continuePercentage, -10), -240);

    track.dataset.percentage = nextPercentage;

    track.animate ({
        transform: `translate(${nextPercentage}%)`
    }, {duration: 1000, fill: "forwards"});
}

//mobile touchmove

container.ontouchstart = e => {
    track.dataset.mouseDownAt = e.clientX;
}

container.ontouchend = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

container.ontouchmove = e => {
    if(track.dataset.mouseDownAt === "0") {return;}

    const mouseChange = parseFloat(track.dataset.mouseDownAt) - e.clientX
    const maxChange = window.innerWidth / 2;

    const percentage = (mouseChange / maxChange) * -100
    const continuePercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(continuePercentage, -10), -240);

    track.dataset.percentage = nextPercentage;

    track.animate ({
        transform: `translate(${nextPercentage}%)`
    }, {duration: 1000, fill: "forwards"});
}
