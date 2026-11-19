# Words in Word

This website is a word game inspired by New York Times' Spelling Bee. 
How it works is by typing words that use the letters from the longer word. 
The longer your word is, the more points you get (scales exponentially).

I made this website for Hack Club's Crescent program for the Arcade Card.

## Live demo: 
https://alphadwastaken.github.io/WordsInWord-project/
<img width="2858" height="1460" alt="image" src="https://github.com/user-attachments/assets/34d9d5a7-3acb-4487-8c1a-ec9e3d72d58d" />
Main game in "BIOLUMINESCENCE"

## You can:
* Type words on your keyboard.
* Switch to phone layout and use buttons instead.
* Navigate through different pages.
* Have fun!

My build stack was HTML, CSS, and JavaScript

The challenges I had were styling and structuring the elements using CSS and deciding tags for the layout in HTML.
An example was when styling letter buttons for the long word. The problem was it always started a new line when I wanted a overflow-x and some sort of whitespace no wrap but for buttons. The fix was displaying inline-flex (flex for the parent container), stating the max and min width, and adjusting the measurement from parent container using gap em (the aspect ratio was used so you could click on the buttons easier or else the button hitboxes were a vertical rectangle).
For JavaScript, I had less problems since I am confident in programming and logic, however this was a time I had to rewrite the submitWord function logic (originally a bunch of if statements inside if statements) to "handle" the remaining conditionals from the WordValidator class.

## How to run it locally:
1. Clone this repository:
   ```bash
   git clone https://github.com/AlphaDwastaken/WordsInWord-project
   ```
2. Open the `WordsInWord-project` folder.
3. Open `index.html` directly in your web browser (or run it with the **Live Server** extension in VS Code).

## Credits and AI usage:
Credits to this tutorial by Coding2GO for helping me with a sidebar nav: https://www.youtube.com/watch?v=R7b3OlEyqug&t=8s
AI (and W3Schools) was used to help me explain existing HTML tags, CSS styling elements, and javascript in-built functions especially when figuring out the final bit of logic which had classes, methods, maps, and sets. Other examples are detecting screen changing in js and clear and set timeout.
In some cases, AI helped me decide efficient ideas/ways to design systems, for example, recommending boundary checking and a way to compare two maps and return its result through the conditions.
