function sketch(p, wordList) {
  let rain = [];
  let words = wordList; //drop duplicate words
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
  
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let lastWordCreationTime = 0; // Initialize a variable to track the time of the last word creation
  let fallingSpeed = 120; // Adjust this value to control the falling speed
  //-------------------------------------------------------------------------------------------------------------

p.setup = function () {
  p.createCanvas(canvasWidth, canvasHeight);
  p.frameRate(frameRate);
}

p.draw = function () {
  p.background(bgcolor);

  // Calculate deltaTime
  let currentTime = p.millis();
  deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  lastTime = currentTime;

  // Check if it's time to create a new word with a 500ms delay
  if (currentTime - lastWordCreationTime >= 500 && currentWordIndex < words.length) {
    rain.push(new Rain(currentWordIndex));
    currentWordIndex++;
    lastWordCreationTime = currentTime; // Update the last word creation time
  }

  for (let i = rain.length - 1; i >= 0; i--) {
    rain[i].update(deltaTime);
    rain[i].display();
    if (typedWord === rain[i].word) {
      console.log("---SUCCESS---");
      typedWord = '';
      score += 1;
      rain.splice(i, 1); // Remove the word when it's typed
    }
    if (rain[i].y > p.height - p.windowHeight / 4) {
      rain.splice(i, 1); // Remove the word when it reaches the bottom
    }
  }

  p.fill(255, 255, 255);
  p.textAlign(p.CENTER);
  p.text(typedWord, canvasWidth / 2, (canvasHeight / 2)+200); 
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
      this.y = 0 //p.random(0, -canvasHeight);
      this.wordIndex = wordIndex; // Initialize the word index with the passed value
      this.length = fontSize * 1.5;
      this.word = words[wordIndex]; // Store the word in the Rain object
    }

    update(deltaTime) {
      this.y = this.y + fallingSpeed * deltaTime; // Adjust position based on speed
      // if (this.y > p.height - p.windowHeight / 4) {
      //   this.reset();
      // }
    }

    display() {
      p.noStroke();
      p.fill(255, 200);
      p.textSize(fontSize);
      p.text(words[this.wordIndex], this.x, this.y); // Display the word from the word list using the word index
    }

    reset() {
      this.x = p.random(100, canvasWidth - 100);
      this.y = 0 //p.random(0, -canvasHeight);

      // Increment the word index and create a new instance when it exceeds the array length
      this.wordIndex++;
      
      if (this.wordIndex >= words.length) return;

      this.word = words[this.wordIndex]; // Update the word when resetting
    }
  }
}

export default sketch;