//const canvas = document.getElementById("game");
//const ctx = canvas.getContext("2d");

//guessing
let currentGuess = "";
const display = document.getElementById("wordDisplay");
//sidebar nav
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById('sidebar');
let sidebarOpen = true;
const mediaQuery = window.matchMedia('(max-width: 800px)');
//mobile button accessibility
const buttons = document.querySelectorAll('.letter-btn');

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('User selected', btn.value)
    })
})

function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('close');
    if (sidebarOpen === false) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    }
}

function handleScreenChange(e) {
    if (e.matches) {
        if (sidebarOpen === false) {
            toggleSidebar();
        }
        console.log("View change");
    }
}

mediaQuery.addEventListener('change',handleScreenChange);

handleScreenChange(mediaQuery);

// Checks if its an actual word from dictionary api using api entries
async function checkWord(word) {
    const url = `https://freedictionaryapi.com/api/v1/entries/en/${word}`;
    //exception handling
    try {
        const response = await fetch(url);
        if (response.status === 404) {
            console.log(`"${word}" has no entry`);
            return false;
        }

        const data = await response.json();
        const hasEntry = Array.isArray(data.entries) && data.entries.length > 0;
        if (hasEntry) {
            console.log(`"${word}" has entry`)
            return true;
        } else {
            console.log(`"${word}" has no entry`)
            return false;
        }
    } catch (error) {
        console.error('Network or API error:', error);
        return false;
    }
}

// Check validity and clear display 
async function submitWord() {
    const word = currentGuess.toLowerCase();
    if (word.length < 3) {
        console.log("Too short");
        currentGuess = "";
        display.textContent = currentGuess;
    } else {
        if (word == "") {
            console.log("No word given")
            currentGuess = "";
            display.textContent = currentGuess;
        } else if (await checkWord(word) === true) {
            currentGuess = "";
            display.textContent = currentGuess;
            //add word
        } else {
            console.log("Not a word")
            currentGuess = "";
            display.textContent = currentGuess;
        }
    } 
}

// Live display, delete, and submit guess
document.addEventListener("keydown", (event) => {
    if (/^[a-zA-Z]$/.test(event.key)) {
        currentGuess += event.key.toUpperCase();
        display.textContent = currentGuess;
    } else if (event.key === "Backspace") {
        currentGuess = currentGuess.slice(0,-1);
        display.textContent = currentGuess;
    } else if (event.key === "Enter") {
        submitWord();
    }
})