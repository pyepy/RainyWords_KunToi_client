import { socket } from "../utils/socket";

function sketch(p, wordList) {
  let rain = [];
  let words = wordList;
  let bgcolor = p.color(100, 100, 100);
  let fontSize = 40; // Define the font size as a public variable

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 30; // Set your desired frame rate
  let canvasWidth = p.windowWidth * 3 / 4;
  let canvasHeight = p.windowHeight;
  let typedWord = ''; // Accumulated typed word
  let textshow = ''; // Text appearing
  let score = 0;
  let currentWordIndex = 0; // Track the current word index
  let wordDisappeared = false; // Initialize as false, indicating no word has disappeared yet
  let hasAppendedNewWord = false; // Flag to track if the newWord has been appended
  
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let lastWordCreationTime = 0; // Initialize a variable to track the time of the last word creation
  let fallingSpeed = 120; // Adjust this value to control the falling speed
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(frameRate);
  
    socket.on("send_word", (data) => {
      // console.log(data.word);
  
      if (wordDisappeared) {
        words.push(data.word);
        hasAppendedNewWord = true;
      }
  
      console.log(words);
    });
  
    setInterval(() => {
      if (wordDisappeared) {
        request_word();
      }
    }, fallingSpeed/4);
  };

  function request_word() {
    socket.emit("request_word",4);
  }

  p.draw = function () {
    p.background(bgcolor);

    // Calculate deltaTime
    let currentTime = p.millis();
    deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Check if it's time to create a new word with a 500ms delay
    if (currentTime - lastWordCreationTime >= 1000 && currentWordIndex < words.length) {
      rain.push(new Rain(currentWordIndex));
      currentWordIndex++;
      lastWordCreationTime = currentTime; // Update the last word creation time
    }

    for (let i = rain.length - 1; i >= 0; i--) {
      rain[i].update(deltaTime);
      rain[i].display();
      if (typedWord === rain[i].word) {
        wordDisappeared = true;
        console.log("---SUCCESS---");
        typedWord = '';
        score += 1;
        rain.splice(i, 1); // Remove the word when it's typed
        console.log(wordDisappeared);
      } else {
        wordDisappeared = false;
      }

      if (rain[i].y > p.height - p.windowHeight / 4) {
        rain.splice(i, 1); // Remove the word when it reaches the bottom
        wordDisappeared = true;
        console.log(wordDisappeared);
      } else {
        wordDisappeared = false;
      }
    }

    p.fill(255, 255, 255);
    p.textAlign(p.CENTER);
    p.text(typedWord, canvasWidth / 2, (canvasHeight / 2) + 200);
    p.text("Score: " + score, 20, 100);
  }

  p.keyTyped = function () {
    if (p.key === 'Enter') {
      typedWord = '';
    } else if (p.key === 'Backspace') {
      typedWord = typedWord.substring(0, typedWord.length - 1); // Remove the last character
    } else {
      typedWord = typedWord + p.key;
    }
  };

  class Rain {
    constructor(wordIndex) {
      this.x = p.random(100, canvasWidth - 100);
      this.y = 0;
      this.wordIndex = wordIndex;
      this.length = fontSize * 1.5;
      this.word = words[wordIndex];
      words.shift();
    }

    update(deltaTime) {
      this.y = this.y + fallingSpeed * deltaTime;
    }

    display() {
      p.noStroke();
      p.fill(255, 200);
      p.textSize(fontSize);
      p.text(words[this.wordIndex], this.x, this.y);
    }
  }
}

export default sketch;
