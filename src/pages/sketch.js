import { socket } from "../utils/socket";

function sketch(p) {
  let rain = [];
  let words = ["Let's", "start", "the", "game", "in", "3", "2", "1", " ", " "," "," "];
  // let words = ["amogus","thomas","edward","james","gordon","percy"]
  let bgcolor = p.color(100, 100, 100, 0);
  let fontSize = 40; // Define the font size as a public variable

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 30; // Set your desired frame rate
  let typedWord = ''; // Accumulated typed word
  let textshow = ''; // Text appearing
  let score = 0;
  let currentWordIndex = 0; // Track the current word index
  let wordDisappeared = false; // Initialize as false, indicating no word has disappeared yet
  
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let lastWordCreationTime = 0; // Initialize a variable to track the time of the last word creation
  let fallingSpeed = 100; // Adjust this value to control the falling speed
  let gameStartTime = 0; // Variable to track the game start time
  let disableTypingDuration = 14000; // Duration in milliseconds to disable typing
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(frameRate);
  
    socket.on("send_word", (data) => {
      // console.log(data.word);
  
      //if (wordDisappeared) {
        words.push(data.word);
      //}
  
      //console.log(words);
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
    if (currentTime - lastWordCreationTime >= 1000) {
      rain.push(new Rain());
      //currentWordIndex++;
      lastWordCreationTime = currentTime; // Update the last word creation time
    }
  
    for (let i = rain.length - 1; i >= 0; i--) {
      rain[i].update(deltaTime);
      rain[i].display();
  
      if (typedWord === rain[i].word) {
        wordDisappeared = true;
        request_word()
        console.log("---SUCCESS---");
        typedWord = '';
        if (rain[i].word !== " ") {
          score += 1;
          socket.emit("req_update_score",{"word": rain[i].word})
        }
        rain.splice(i, 1); // Remove the word when it's typed
        //=console.log(wordDisappeared);
      } else {
        wordDisappeared = false;
      }
  
      if (rain[i] && rain[i].y > p.height - p.windowHeight / 4) {
        rain.splice(i, 1); // Remove the word when it reaches the bottom
        wordDisappeared = true;
        request_word()
        //console.log(wordDisappeared);
      } else {
        wordDisappeared = false;
      }
    }
  
    p.fill(255, 255, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(typedWord, p.width / 2, p.height / 2 + 200);
    p.text("Score: " + score, 200, 100);
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
    constructor() {
      this.x = p.random(300, p.windowWidth - 300);
      this.y = 0;
      
      this.word = words[0];
      console.log(words[0]);
      if(words[0] == undefined){
        this.word = 'error';
        //request_word()
      };
      words.shift();
      
      this.letterSize = fontSize;
    }
  
    update(deltaTime) {
      this.y = this.y + fallingSpeed * deltaTime;
    }
  
    display() {
      p.noStroke();
      let currentX = this.x;
      let typedIndex = 0; // Initialize an index for tracking the typed letters
    
      if (this.word.includes(typedWord)) {
        for (let i = 0; i < this.word.length; i++) {
          let letter = this.word.charAt(i);
      
          // Check if there is a letter in the typedWord to compare
          if (typedIndex < typedWord.length) {
            let typedLetter = typedWord.charAt(typedIndex);
      
            // Set the fill color for the letter based on whether it matches the typed letter
            if (letter === typedLetter) {
              p.fill('#533ECE'); // Highlight the matching letter
              typedIndex++; // Move to the next letter in typedWord
            } else {
              p.fill(255); // Set the fill color for non-matching letters
            }
          } else {
            p.fill(255); // No more letters in typedWord, so set the fill color to white
          }
      
          // Draw the square (background) for the letter
          p.rect(currentX, this.y, this.letterSize, this.letterSize);
      
          p.textSize(this.letterSize);
          p.fill(0);
          p.text(letter, currentX + this.letterSize / 2, this.y + this.letterSize / 1.5); // Adjust text position
      
          currentX += this.letterSize;
        }
      } else {
        for (let i = 0; i < this.word.length; i++) {
          let letter = this.word.charAt(i);
          
          // Draw the square (background) for the letter
          p.fill(255);
          p.rect(currentX, this.y, this.letterSize, this.letterSize);
      
          p.textSize(this.letterSize);
          p.fill(0);
          p.text(letter, currentX + this.letterSize / 2, this.y + this.letterSize / 1.5); // Adjust text position
      
          currentX += this.letterSize;
        }
      }
    }         
  }
}

export default sketch;
