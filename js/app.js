/**
 * Website Javascript
 * 
 * @author Jacob Ota
 */
const header = document.getElementById("header");
const elem = document.getElementsByClassName("navbar")[0];

const list = elem.children[0].children;

//put an eventlistener on all of the list elements
for(let i = 0; i < list.length; i++) {
    if(list[i].textContent.toLowerCase() != "home") {
        let myUrl = "";
    list[i].addEventListener("click", (e) => {
        console.log(list[i].textContent.toLowerCase());
        myUrl = `../pages/${list[i].textContent.toLowerCase()}.html`;
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
