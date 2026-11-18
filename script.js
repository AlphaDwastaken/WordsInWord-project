//used class for managing multiple data types, map for obtaining and comparing item and value, and set to record words
class WordValidator {
    constructor(targetWord) {
        this.targetWord = targetWord.toLowerCase();
        this.targetMap = this.buildMap(this.targetWord);
        this.usedWords = new Set();
    }

    //turn string into maps
    buildMap(word) {
        const freqMap = new Map();
        for (const char of word.toLowerCase()) {
            freqMap.set(char, (freqMap.get(char) || 0) +  1); //operation that gets the string and records the char and its amount of times appeared
        }
        return freqMap;
    }

    // self-explanitory
    validateGuess(userWord) {
        const cleanWord = userWord.trim().toLowerCase();

        //check set for used words
        if (this.usedWords.has(cleanWord)) {
            return { valid: false, reason: "Word already used"};
        }

        // build 2nd map and compare
        const userMap = this.buildMap(cleanWord);
        for (const [letter, count] of userMap) {
            //condition: unknown letter
            if (!this.targetMap.has(letter)) {
                userMap.clear();
                return { valid: false, reason: `Letter '${letter}' is not allowed`};
            }
            //condition: more letters
            if (count > this.targetMap.get(letter)) {
                userMap.clear();
                return { valid: false, reason: `Too many '${letter}'s`}
            }
        }
        return { valid: true};
    }

    addValidWord(word) {
        this.usedWords.add(word.trim().toLowerCase());
        return this.usedWords;
    }
}

//const canvas = document.getElementById("game");
//const ctx = canvas.getContext("2d");

//guessing
let currentGuess = "";
const display = document.getElementById("wordDisplay");
let isRunning = false;
let totalScore = 0;
const currentWord = new WordValidator("BIOLUMINESCENCE");
//another good one is ultraviolet
//sidebar nav
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById('sidebar');
let sidebarOpen = true;
const mediaQuery = window.matchMedia('(max-width: 800px)');
//mobile button accessibility
const letterBtns = document.querySelectorAll('.letter-btn');
const inputBtns = document.querySelectorAll('.input-btns');
//word box
const wordList = document.getElementById("wordList");

//that one small add button
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function() {
    alert('TBA');
});

//mobile/physical inputs
letterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('User selected', btn.value)
        currentGuess += btn.value.toUpperCase();
        display.textContent = currentGuess;
    })
})
inputBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('User selected', btn.value)
        if (btn.value === "Backspace") {
            currentGuess = currentGuess.slice(0,-1);
            display.textContent = currentGuess;
        } else if (btn.value === "Enter") {
            submitWord();
        }
    })
})

//function display conditions to html with some delay until disapear
let timerId;
async function displayCondition(condition) {
    clearTimeout(timerId);
    document.getElementById("alert").textContent = condition;
    timerId = setTimeout(() => {
        document.getElementById("alert").textContent = "";
    }, 2000);
}

//points and equation
function givePoints(length_of_word) {
    points = Math.round(10 * (1.85 ** (length_of_word - 3)));
    totalScore += points;
    document.getElementById("scoreCount").textContent = totalScore;
}

//toggle sidebar
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('close');
    if (sidebarOpen === false) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    }
}

//fix sidebar cutting out
function handleScreenChange(e) {
    if (e.matches) {
        if (sidebarOpen === false) {
            toggleSidebar();
        }
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
            displayCondition(`"${word}" has no entry`);
            return false;
        }

        const data = await response.json();
        const hasEntry = Array.isArray(data.entries) && data.entries.length > 0;
        if (hasEntry) {
            displayCondition(`"${word}" has entry`)
            return true;
        } else {
            displayCondition(`"${word}" has no entry`)
            return false;
        }
    } catch (error) {
        displayCondition('Network or API error:', error);
        return false;
    }
}

// Check basic word validity and clear display 
async function submitWord() {
    const word = currentGuess.trim().toLowerCase();
    //handle simultaneous input
    if (isRunning) return;

    currentGuess = "";
    display.textContent = currentGuess;

    if (!word) {
        displayCondition("No word given");
        return;
    }
    
    if (word.length < 3) {
        displayCondition("Too short");
        return;
    }

    const letterCheck = currentWord.validateGuess(word);
    if (!letterCheck.valid) {
        displayCondition(letterCheck.reason);
        return;
    }

    isRunning = true;
    //checks final validation (with applied rule)
    try {
        const isRealWord = await checkWord(word);
        if (isRealWord) {
            const wordSet = currentWord.addValidWord(word);
            let wordCounter = 0;
            wordList.innerHTML = "";
            document.getElementById("wordCount").textContent = wordCounter;
            for (const validWord of wordSet) { 
                const wordDiv = document.createElement("div");
                wordDiv.textContent = validWord.toUpperCase();
                wordList.appendChild(wordDiv);
                document.getElementById("wordCount").textContent = ++wordCounter;
                givePoints(word.length);
            }
        }
    } finally {
        isRunning = false;
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