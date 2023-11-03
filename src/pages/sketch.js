import { socket } from "../utils/socket";

function sketch(p) {
  let rain = [];
<<<<<<< Updated upstream
  let words = ["Let's", "start", "the", "game", "in", "3", "2", "1", ".", ".",".","."];
  // let words = ["amogus","thomas","edward","james","gordon","percy"]
=======
  let words = [{"word":"yood","powerUp":"freeze"}, {"word":"shaa","powerUp":"slow"}, {"word":"ngai","powerUp":"easy"}, {"word":"utokapai","powerUp":"flood"}, {"word":"tabod","powerUp":"blind"}, {"word":"tuam","powerUp":"flood_e"}];
  // let words = ["freeze","slow","easy","flood","clear"]
>>>>>>> Stashed changes
  let bgcolor = p.color(100, 100, 100, 0);
  let fontSize = 36; // Define the font size as a public variable

  //鸡蛋照片
  let eggDefault = p.loadImage('./images/chicken1.png');
  let eggTyped = p.loadImage('./images/chicken5.png');
  let eggDed = p.loadImage('./images/egg_ded.png');

  //freeze powerup
  let isRainFrozen = false; // Initialize a variable to control rain freezing
  let freezeStartTime = 0; // Initialize a variable to track the start time of freezing
  const freezeDuration = 5000; // 5 seconds in milliseconds

  //slow powerup
  let isRainSpeedHalved = false;
  let speedHalveStartTime = 0;
  const speedHalveDuration = 4000; // 4 seconds in milliseconds

  //flood board
  let isWordGenDelayHalved = false;
  let wordGenDelayHalveStartTime = 0;
  const wordGenDelayHalveDuration = 10000;

  //clear board
  let isCleared = false;

  //blind
  let isBlinded = false;
  let blindStartTime = 0;
  const blindDuration = 5000;

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 30; // Set your desired frame rate
  let typedWord = ''; // Accumulated typed word
  let score = 0;
  let wordGenDelay = 1000;
  
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let lastWordCreationTime = 0; // Initialize a variable to track the time of the last word creation
  let fallingSpeed = 80; // Adjust this value to control the falling speed
  let gameStartTime = 0; // Variable to track the game start time
  let disableTypingDuration = 20000; // Duration in milliseconds to disable typing
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(frameRate);
  
    socket.on("send_word", (data) => {
      words.push(data.word);

      if ((p.keyIsDown(69) && p.keyIsDown(90)) || (p.keyIsDown(70) && p.keyIsDown(66))) { // if e+z or f+b are pressed
        // Insert the new word at index 1
        words.splice(1, 0, data.word);
      }
    
    });
    socket.on("blind_powerup_activated", () => {
      // Handle the "blind" effect for other players here
      isBlinded = true;
      blindStartTime = p.millis();
    });

    socket.on("flood_board", () => {
      isWordGenDelayHalved = true;
      wordGenDelayHalveStartTime = p.millis();
    });
    socket.on("blind_powerup_activated", () => {
      // Handle the "blind" effect for other players here
      isBlinded = true;
      blindStartTime = p.millis();
    });
    socket.on("flood_enemy_activated"), () => {
      isWordGenDelayHalved = true;
      wordGenDelayHalveStartTime = p.millis();
      let i = 0;
      while(i<10) {
        if(i%3 == 0 ) {
          socket.emit("req_word_fixed_len",3); //length 3
          i++;
        } else if (i%3 == 2) {
          socket.emit("req_word_fixed_len",2); //length 2
          i++;
        } else {
          socket.emit("req_word_fixed_len",4); //length 4
          i++;
        }
      }
    }
    function start_time() {
      socket.emit("mess_with_time",'hi');
    }

    socket.once('start_timer', () => {
      start_time();
    })

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
  
    // Check if it's time to create a new word with a ... delay
    if(isWordGenDelayHalved){
      if (currentTime - lastWordCreationTime >= wordGenDelay*120/(2*fallingSpeed) && isRainFrozen == false) {
        rain.push(new Rain());
        lastWordCreationTime = currentTime; // Update the last word creation time
      }
    } else {
      if (currentTime - lastWordCreationTime >= wordGenDelay*120/fallingSpeed && isRainFrozen == false) {
        rain.push(new Rain());
        lastWordCreationTime = currentTime; // Update the last word creation time
      }
    }
  
    for (let i = rain.length - 1; i >= 0; i--) {
      if (!isRainFrozen) {
        if (isRainSpeedHalved) {
          rain[i].update(deltaTime / 2); // Halve the falling speed
        } else {
          rain[i].update(deltaTime);
        }
      }
      rain[i].display();
  
      if (typedWord === rain[i].word  && rain[i].y < p.height - p.windowHeight / 4  && rain[i].word !== ".") {
<<<<<<< Updated upstream
=======
        if (rain[i].powerUp === "freeze") { 
          isRainFrozen = true; // Freeze the rain
          freezeStartTime = p.millis(); // Record the start time of freezing
        } else if (rain[i].powerUp === "slow") { 
          isRainSpeedHalved = true;
          speedHalveStartTime = p.millis();
        } else if (rain[i].powerUp === "easy") { 
          for(let i = 0; i < 5; i++) {
            if(i%3 == 0 || i%3 == 2) {
              socket.emit("req_word_fixed_len",3); //length 3
            } else {
              socket.emit("req_word_fixed_len",2); //length 2
            }
          }
        } else if (rain[i].powerUp === "flood") {
          isWordGenDelayHalved = true;
          wordGenDelayHalveStartTime = p.millis();
          let i = 0;
          while(i<10) {
            if(i%3 == 0 ) {
              socket.emit("req_word_fixed_len",3); //length 3
              i++;
            } else if (i%3 == 2) {
              socket.emit("req_word_fixed_len",2); //length 2
              i++;
            } else {
              socket.emit("req_word_fixed_len",4); //length 4
              i++;
            }
          }
        } else if (rain[i].powerUp === "blind") {
            socket.emit("activate_blind_powerup");
        } else if (rain[i].powerUp === "flood_e") {
            socket.emit("activate_flood_enemy")
        }
        
        
        //else if (typedWord === "clear") {
        //   if (!isCleared) {
        //       rain.splice(0,i);
        //   }
        // }      
        
>>>>>>> Stashed changes
        request_word()
        console.log("---SUCCESS---");
        typedWord = '';
        if (rain[i].word !== " " && rain[i].word !== ".") {
          score += 1;
          socket.emit("req_update_score",{"word": rain[i].word})
        }
        rain.splice(i, 1); // Remove the word when it's typed
      } 
  
      if (rain[i] && rain[i].y > p.height ) { //- p.windowHeight / 4
        rain.splice(i, 1); // Remove the word when it reaches the bottom
        request_word()
      }
    }
    // Check if it's time to unfreeze the rain
    if (isRainFrozen && p.millis() - freezeStartTime >= freezeDuration) {
      isRainFrozen = false; // Unfreeze the rain after 5 seconds
    }

    if (isRainSpeedHalved && p.millis() - speedHalveStartTime >= speedHalveDuration) {
      isRainSpeedHalved = false;
    }

    if (isWordGenDelayHalved && p.millis() - wordGenDelayHalveStartTime >= wordGenDelayHalveDuration) {
      isWordGenDelayHalved = false;
    }

    if (isBlinded && p.millis() - blindStartTime >= blindDuration) {
      isBlinded = false;
    }
  
    if (isBlinded) {
      let rectw = 
      p.fill(0);
      p.rect(p.windowWidth/4+23, p.windowHeight-788 , p.windowWidth/2-46, 350);
    }
    p.fill(255, 255, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(typedWord, p.width / 2, p.height - 48);
    p.fill(0);
    p.text("Score: " + score, 200, 100);
    console.log(words);
  }
  

  p.keyPressed = function () {
    if (p.keyCode === p.ENTER) {
      typedWord = '';
    } else if (p.keyCode === p.BACKSPACE) {
      typedWord = typedWord.substring(0, typedWord.length - 1); // Remove the last character
    } 
    //self pwrup
      else if (p.keyIsDown(82) && p.keyIsDown(70)) { // 82 is the key code for 'r' and 70 is the key code for 'f'
      isRainFrozen = true; // Freeze the rain
      freezeStartTime = p.millis(); // Record the start time of freezing
    } else if (p.keyIsDown(83) && p.keyIsDown(76)) { // 83 is the key code for 's' and 76 is the key code for 'l'
      isRainSpeedHalved = true;
      speedHalveStartTime = p.millis();
    } else if (p.keyIsDown(69) && p.keyIsDown(90)) { // 69 is the key code for 'e' and 90 is the key code for 'z'
      for(let i = 0; i < 5; i++) {
        if(i%3 == 0 || i%3 == 2) {
          socket.emit("req_word_fixed_len",3); //length 3
        } else {
          socket.emit("req_word_fixed_len",2); //length 2
        }
      }
    } else if (p.keyIsDown(70) && p.keyIsDown(66)) { // 70 is the key code for 'f' and 66 is the key code for 'b'
      isWordGenDelayHalved = true;
      wordGenDelayHalveStartTime = p.millis();
      let i = 0;
      while(i<10) {
        if(i%3 == 0 ) {
          socket.emit("req_word_fixed_len",3); //length 3
          i++;
        } else if (i%3 == 2) {
          socket.emit("req_word_fixed_len",2); //length 2
          i++;
        } else {
          socket.emit("req_word_fixed_len",4); //length 4
          i++;
        }
      }

    } else if (p.keyIsDown(67) && p.keyIsDown(66)) { // 67 is the key code for 'c' and 66 is the key code for 'b'
      if (!isCleared) {
        // Clear all words falling
        rain = [];
      }
    }
      //eminempwrup
      else if (p.keyIsDown(66) && p.keyIsDown(76)) { //66 is the key code for 'b' and 76 is for 'l' (blind)
        socket.emit("activate_blind_powerup");
      }

      // else if (p.keyIsDown(70) && p.keyIsDown(69)) { //670 is the key code for 'f' and 69 is for 'e' (flood enemy)
      //   socket.emit("flood_board");
      // }

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
      this.word = words[0];
      this.x = p.random(400, p.windowWidth - 400 - this.word.length*fontSize);
      this.y = 0;
      
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
      
      if (this.word.includes(typedWord) && typedWord !== '' && typedWord !== '.' && this.y < p.height - p.windowHeight / 4 + this.letterSize) {
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

        // Calculate the position for the image in the middle of the word
        let imageX = this.x + (currentX - this.x - this.letterSize) / 2;
        p.image(eggTyped, imageX, this.y - this.letterSize*1.5, eggTyped.width*2/3, eggTyped.height*2/3);
        
      } else if (this.y > p.height - p.windowHeight / 4 + this.letterSize) {
        for (let i = 0; i < this.word.length; i++) {
          let letter = this.word.charAt(i);
          
          // Draw the square (background) for the letter
          p.fill(255,255,255,0);
          p.rect(currentX, this.y, this.letterSize, this.letterSize);
      
          p.textSize(this.letterSize);
          p.fill(0,0,0,0);
          p.text(letter, currentX + this.letterSize / 2, this.y + this.letterSize / 1.5); // Adjust text position
      
          currentX += this.letterSize;
        }

        // Calculate the position for the image in the middle of the word
        let imageX = this.x + (currentX - this.x - this.letterSize) / 2;
        p.image(eggDed, imageX - eggDed.width/4, p.height - p.windowHeight / 4);

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

        // Calculate the position for the image in the middle of the word
        let imageX = this.x + (currentX - this.x - this.letterSize) / 2;
        p.image(eggDefault, imageX, this.y - this.letterSize*1.5, eggTyped.width*2/3, eggTyped.height*2/3);
      }
    }       
  }
}

export default sketch;