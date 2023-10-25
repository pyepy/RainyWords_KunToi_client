import { socket } from "../utils/socket";

function sketch(p) {
  let rain = [];
  let words = ["Let's", "start", "the", "game", "in", "3", "2", "1", "  ", " "," "," "];
  let bgcolor = p.color(100, 100, 100, 0);
  let fontSize = 40; // Define the font size as a public variable

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 30; // Set your desired frame rate
  // let canvasWidth = p.windowWidth * 3 / 4;
  // let canvasHeight = p.windowHeight;
  let typedWord = ''; // Accumulated typed word
  let textshow = ''; // Text appearing
  //let score = 0;
  let currentWordIndex = 0; // Track the current word index
  let wordDisappeared = false; // Initialize as false, indicating no word has disappeared yet
  
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let lastWordCreationTime = 0; // Initialize a variable to track the time of the last word creation
  let fallingSpeed = 120; // Adjust this value to control the falling speed
  let gameStartTime = 0; // Variable to track the game start time
  let disableTypingDuration = 14000; // Duration in milliseconds to disable typing
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(frameRate);
  
    socket.on("send_word", (data) => {
      // console.log(data.word);
  
      if (wordDisappeared) {
        words.push(data.word);
      }
  
      console.log(words);
    });
  
    // setInterval(() => {
    //   if (wordDisappeared) {
    //     request_word();
    //   }
    // },fallingSpeed/4);

    gameStartTime = p.millis(); // Record the game start time
  };

  function request_word() {
    socket.emit("request_word",4);
  }

  p.draw = function () {
    p.clear();
    p.background(bgcolor);

    // Calculate deltaTime
    let currentTime = p.millis();
    deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Check if it's time to create a new word with a 500ms delay
    if (currentTime - lastWordCreationTime >= 1000 ) {
      rain.push(new Rain(currentWordIndex));
      currentWordIndex++;
      lastWordCreationTime = currentTime; // Update the last word creation time
    }

    for (let i = rain.length - 1; i >= 0; i--) {
      rain[i].update(deltaTime);
      rain[i].display();

      if (typedWord === rain[i].word) {
        wordDisappeared = true;
        request_word();
        console.log("---SUCCESS---");
        typedWord = '';
        if (rain[i].word !== " ") {
          //score += 1;
          socket.emit("req_update_score",{"word": rain[i].word})
        }
        rain.splice(i, 1); // Remove the word when it's typed
        console.log(wordDisappeared);
      } else {
        wordDisappeared = false;
      }

      if (rain[i].y > p.height - p.windowHeight / 4) {
        rain.splice(i, 1); // Remove the word when it reaches the bottom
        wordDisappeared = true;
        request_word();
        console.log(wordDisappeared);
      } else {
        wordDisappeared = false;
      }
    }

    p.fill(255, 255, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(typedWord, p.width / 2, p.height / 2 + 200);
    //p.text("Score: " + score, 200, 100);
  }

  p.keyPressed = function () {
    if (p.keyCode === p.ENTER) {
      typedWord = '';
    } else if (p.keyCode === p.BACKSPACE) {
      typedWord = typedWord.substring(0, typedWord.length - 1); // Remove the last character
    }
  };
  
  p.keyTyped = function () {
    const currentTime = p.millis();
    if (currentTime - gameStartTime >= disableTypingDuration) {
      if (p.key !== 'Enter' && p.key !== 'Backspace') {
        typedWord = typedWord + p.key;
      }
    }
  };

  class Rain {
    constructor(wordIndex) {
      this.x = p.random(300, p.windowWidth - 300);
      this.y = 0;
      this.wordIndex = wordIndex;
      this.length = fontSize * 1.5;
      this.word = words[wordIndex];
    }

    update(deltaTime) {
      this.y = this.y + fallingSpeed * deltaTime;
    }

    display() {
      p.noStroke();
      p.textSize(fontSize);
      let currentX = this.x; // Initialize the currentX variable
    
      if (this.word.includes(typedWord)) {
        const matchStart = this.word.indexOf(typedWord); // Find the starting index of the match
        const matchEnd = matchStart + typedWord.length; // Calculate the ending index of the match
        const beforeMatch = this.word.substring(0, matchStart);
        const matchedPart = this.word.substring(matchStart, matchEnd);
        const afterMatch = this.word.substring(matchEnd);
    
        p.text(beforeMatch, currentX, this.y);
        // currentX += beforeMatch.length * fontSize * 0.6; // Update currentX
        p.fill('#533ECE'); // Fill color for the matching part
        p.text(matchedPart, currentX, this.y);
        p.fill(255, 200); // Reset fill color to default
        currentX += matchedPart.length * fontSize * 0.6; // Update currentX
        p.text(afterMatch, currentX, this.y);
      } else {
        p.text(this.word, currentX, this.y);
      }
    }    
  }
}

export default sketch;
