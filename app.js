/**
 * Website Javascript
 * 
 * @author Jacob Ota
 */

let dropdown_button = document.querySelector(".fa-circle-chevron-down");
let buttonActive = false;

//add event listener on a click
dropdown_button.addEventListener("click", () => {
    if(buttonActive) {
        dropdown_button.className = "fa-solid fa-circle-chevron-down"
    } else {
        dropdown_button.className = "fa-solid fa-circle-chevron-up"
    }
    buttonActive = !buttonActive;
})