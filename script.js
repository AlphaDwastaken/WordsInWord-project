//const canvas = document.getElementById("game");
//const ctx = canvas.getContext("2d");
let currentGuess = "";
const display = document.getElementById("wordDisplay");

document.addEventListener("keydown", (event) => {
    if (/^[a-zA-Z]$/.test(event.key)) {
        currentGuess += event.key;
        display.textContent = currentGuess;
    }
})