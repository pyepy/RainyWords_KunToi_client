import { socket } from "../utils/socket";
import { userDiff, userSpeed } from '../utils/userdata';

function sketch(p) {
  let rain = [];
  // let words = [{"word":"yood","powerUp":"freeze"}, {"word":"shaa","powerUp":"slow"}, {"word":"ngai","powerUp":"easy"}
  // , {"word":"utok","powerUp":"flood"}
  // , {"word":"tabod","powerUp":"blind"}, {"word":"tuam","powerUp":"flood_e"},{"word":"ohno","powerUp":"nword"}];
  let words = []
  let bgcolor = p.color(100, 100, 100, 0);
  let fontSize = 36; // Define the font size as a public variable
  let defaultSong;

  //鸡蛋照片
  let eggDefault = p.loadImage('./images/chicken1.png');
  let eggTyped = p.loadImage('./images/chicken5.png');
  let eggDed = p.loadImage('./images/egg_ded.png');
  let eggPowerSelf = p.loadImage('./images/Emu1.png');
  let eggPowerSelfTyped = p.loadImage('./images/Emu5.png');
  let eggPowerEnemy = p.loadImage('./images/Goose1.png');
  let eggPowerEnemyTyped = p.loadImage('./images/Goose5.png');
  let eggMuslim = p.loadImage('./images/MuslimEgg.png');
  let eggMuslimTyped = p.loadImage('./images/MuslimEggUwU.png');

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

  //blind
  let isBlinded = false;
  let blindStartTime = 0;
  const blindDuration = 5000;
  let currentBlindColour = 'white';
 
  //easy
  //let isEasy = false;
  //let easyStartTime = 0;
  //const easyDelayDuration = 5000;

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 30; // Set your desired frame rate
  let typedWord = ''; // Accumulated typed word
  let score = 0;
  let wordGenDelay = 1000;
  
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let lastWordCreationTime = 0; // Initialize a variable to track the time of the last word creation
  let fallingSpeed = 70*userSpeed; // Adjust this value to control the falling speed
  let gameStartTime = 0; // Variable to track the game start time
  let disableTypingDuration = 4000//20000; // Duration in milliseconds to disable typing

  //Difficulty
  let mode = userDiff;

  //Typing
  let backspaceHeld = false;
  let backspaceHoldStartTime = 0;
  const holdDuration = 500; // 500 milliseconds
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(frameRate);
    p.textFont( 'Autour One');
    
    socket.on("send_word", (data) => {
      if (data.powerUp === "p_none" || data.powerUp === "p_freeze" || data.powerUp === "p_slow" || data.powerUp === "p_nword" ) {
        words.splice(0, 0, {"word":data.word,"powerUp":data.powerUp});
      } else {
        words.push({"word":data.word,"powerUp":data.powerUp});
      }
      //if ((p.keyIsDown(69) && p.keyIsDown(90)) || (p.keyIsDown(70) && p.keyIsDown(66))) { // if e+z or f+b are pressed
      //if (isWordGenDelayHalved || isEasy) {
        // Insert the new word at index 1
    
      //}
    });

    socket.on("blind_enemy", () => {
      // Handle the "blind" effect for other players here
      isBlinded = true;
      blindStartTime = p.millis();
    });

    socket.on("flood_enemy", () => {
      isWordGenDelayHalved = true;
      wordGenDelayHalveStartTime = p.millis();
      let i = 0;
      while(i<10) {
        if(i%3 == 0 ) {
          socket.emit("req_flood_word",{"len":3,"mode":mode}); //length 3 
          i++;
        } else if (i%3 == 2) {
          socket.emit("req_flood_word",{"len":2,"mode":mode}); //length 2
          i++;
        } else {
          socket.emit("req_flood_word",{"len":4,"mode":mode}); //length 4
          i++;
        } 
      }
    });

    function start_time() {
      socket.emit("mess_with_time",'hi');
    }

    socket.once('start_timer', () => {
      start_time();
    })

    gameStartTime = p.millis(); // Record the game start time
  };

  function request_word() {
    socket.emit("request_word",mode);
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
        if (currentTime >= 4600) rain.push(new Rain());
        lastWordCreationTime = currentTime; // Update the last word creation time
      }
    } else {
      if (currentTime - lastWordCreationTime >= wordGenDelay*120/fallingSpeed && isRainFrozen == false) {
        if (currentTime >= 4600) rain.push(new Rain());
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
  
      if (typedWord === rain[i].word  && (rain[i].y < p.height - p.windowHeight / 4 + rain[i].letterSize)  && rain[i].word !== ".") {
        if (rain[i].powerUp === "freeze" || rain[i].powerUp === "p_freeze") { 
          isRainFrozen = true; // Freeze the rain
          freezeStartTime = p.millis(); // Record the start time of freezing
        } else if (rain[i].powerUp === "slow" || rain[i].powerUp === "p_slow") { 
          isRainSpeedHalved = true;
          speedHalveStartTime = p.millis();
        } else if (rain[i].powerUp === "easy") { 
          //isEasy = true;
          for(let i = 0; i < 5; i++) {
            if(i%3 == 0 || i%3 == 2) {
              socket.emit("req_word_fixed_len",{"len":3,"mode":mode}); //length 3
            } else {
              socket.emit("req_word_fixed_len",{"len":2,"mode":mode}); //length 2
            }
          }
        } 
        // else if (rain[i].powerUp === "flood") {
        //   isWordGenDelayHalved = true;
        //   wordGenDelayHalveStartTime = p.millis();
        //   let i = 0;
        //   while(i<10) {
        //     if(i%3 == 0 ) {
        //       socket.emit("req_word_fixed_len",{"len":3,"mode":mode}); //length 3
        //       i++;
        //     } else if (i%3 == 2) {
        //       socket.emit("req_word_fixed_len",{"len":2,"mode":mode}); //length 2
        //       i++;
        //     } else {
        //       socket.emit("req_word_fixed_len",{"len":4,"mode":mode}); //length 4
        //       i++;
        //     }
        //   }
        // } 
        else if (rain[i].powerUp === "blind") {
          socket.emit("req_blind");
        } else if (rain[i].powerUp === "flood_e") {
          socket.emit("req_flood_enemy")
        }  
        
        request_word()
        console.log("---SUCCESS---");
        typedWord = '';
        if (rain[i].word !== " " && rain[i].word !== ".") {
          score += 1;
          let diffTime = Math.floor((currentTime - rain[i].initialTime)/1000);
          if (diffTime < 0) {
            diffTime = 0;
          }
          socket.emit("req_success",{"word": rain[i].word,"len":rain[i].len,"diffTime":diffTime,"powerUp":rain[i].powerUp})
        }
        rain.splice(i, 1); // Remove the word when it's typed
      } 
      
      if ((rain[i] && rain[i].y > p.height - p.windowHeight / 4 + rain[i].letterSize) && rain[i].gone == false) { //- p.windowHeight / 4

        setTimeout(function() {
          rain.shift();
        }, 5000);
        // rain.splice(i, 1); // Remove the word when it reaches the bottom
        request_word()
        socket.emit("req_fail",{"word": rain[i].word,"len":rain[i].len,"powerUp":rain[i].powerUp})
        rain[i].gone = true;
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

    //if (isEasy && p.millis() - easyStartTime >= easyDelayDuration) {
    //  isEasy = false;
    //}

    if (isBlinded && p.millis() - blindStartTime < blindDuration) {
      currentBlindColour = p.color(25, 25, 25);
    } else {
      currentBlindColour = p.color('white'); // Set it back to the default color
    }
  
    p.fill(255, 255, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(typedWord, p.width / 2, p.height - 48);
    p.fill(0);
    //p.text("Score: " + score, 200, 100);
    // console.log(words);
  }
  

  p.keyPressed = function () {
    if (p.keyCode === p.ENTER) {
      typedWord = '';
    } else if (p.keyCode === p.BACKSPACE) {
        // while (p.keyIsDown(p.BACKSPACE)) {
        backspaceHeld = true;

        p.deleteCharacter();
        
      //}
      // Remove the last character
    } 
  };
  
  p.keyReleased = function () {
    if (p.keyCode === p.BACKSPACE) {
      backspaceHeld = false;
    }
  }

  p.deleteCharacter = function () {
    if (backspaceHeld && typedWord.length > 0) {
      typedWord = typedWord.substring(0, typedWord.length - 1);
      setTimeout(p.deleteCharacter, 150); // Adjust the delay if needed
    }
  }

  p.keyTyped = function () {
    const currentTime = p.millis();
    if (currentTime - gameStartTime >= disableTypingDuration) {
      if (p.key !== 'Enter' && p.key !== 'Backspace' && p.key !== ' ') {
        typedWord = typedWord + p.key;
      }
    }
  };

  class Rain {
    constructor() {
      this.word = words[0].word;
      this.len = this.word.length;
      this.x = p.random(400, p.windowWidth - 400 - this.word.length*fontSize);
      this.y = 0;
      this.initialTime = p.millis();
      this.powerUp = words[0].powerUp;
      this.gone = false;
      
      console.log(words[0].word);
      if(words[0].word == undefined){
        this.word = 'error';
        //request_word()
      };
      words.shift();
      
      this.letterSize = fontSize;
    }
  
    update(deltaTime) {
      this.y = this.y + fallingSpeed * deltaTime;
    }

    colouring(colour, normalEgg, typedEgg) {
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
              p.fill('pink'); // Highlight the matching letter
              typedIndex++; // Move to the next letter in typedWord
            } else {
              p.fill(colour); // Set the fill color for non-matching letters
            }
          } else {
            p.fill(colour); // No more letters in typedWord, so set the fill color to white
          }
      
          // Draw the square (background) for the letter
          p.rect(currentX, this.y, this.letterSize + 3, this.letterSize + 3, 15);
      
          p.textSize(this.letterSize);
          p.fill(0);
          p.text(letter, currentX + this.letterSize / 2, this.y + this.letterSize / 1.5); // Adjust text position
      
          currentX += this.letterSize;
        }

        // Calculate the position for the image in the middle of the word
        let imageX = this.x + (currentX - this.x - this.letterSize) / 2;
        if (this.powerUp == 'nword'){
          p.image(typedEgg, imageX - 10, this.y - this.letterSize*2, eggTyped.width, eggTyped.height);
        } else p.image(typedEgg, imageX, this.y - this.letterSize*1.5, eggTyped.width*2/3, eggTyped.height*2/3);
        
      } else if (this.y > p.height - p.windowHeight / 4 + this.letterSize) {
        for (let i = 0; i < this.word.length; i++) {
          let letter = this.word.charAt(i);
          
          // Draw the square (background) for the letter
          p.fill(0,0,0,0);
          p.rect(currentX, this.y, this.letterSize + 3, this.letterSize + 3, 15);
      
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
          p.fill(colour);
          p.rect(currentX, this.y, this.letterSize + 3, this.letterSize + 3, 10);
      
          p.textSize(this.letterSize);
          p.fill(0);
          p.text(letter, currentX + this.letterSize / 2, this.y + this.letterSize / 1.5); // Adjust text position
      
          currentX += this.letterSize;
        }

        if(normalEgg === eggMuslim) {
          // Calculate the position for the image in the middle of the word
          let imageX = this.x + (currentX - this.x - this.letterSize*1.5  ) / 2;
          p.image(normalEgg, imageX, this.y - this.letterSize*2, eggTyped.width, eggTyped.height);
        } else {
          // Calculate the position for the image in the middle of the word
          let imageX = this.x + (currentX - this.x - this.letterSize) / 2;
          p.image(normalEgg, imageX, this.y - this.letterSize*1.5, eggTyped.width*2/3, eggTyped.height*2/3);
        }
        
      }
    }
  
    display() {
      p.noStroke();
      
      if (this.powerUp === "freeze" || this.powerUp === "p_freeze") { 
        //blue and emu
        this.colouring('#C1E7E8', eggPowerSelf, eggPowerSelfTyped);
      } else if (this.powerUp === "slow" || this.powerUp === "p_slow") { 
        //yellow and emu
        this.colouring('#FFFFA8', eggPowerEnemy, eggPowerEnemyTyped);
      } else if (this.powerUp === "flood_e") { 
        //red and goose
        this.colouring('#1878CC', eggPowerSelf, eggPowerSelfTyped);
      } else if (this.powerUp === "easy") { 
        //green and emu
        this.colouring('#BEED5F', eggPowerSelf, eggPowerSelfTyped);
      } else if (this.powerUp === "blind") { 
        //purple and goose
        this.colouring('#D6C1E8', eggPowerEnemy, eggPowerEnemyTyped);
      } else if (this.powerUp === "nword" || this.powerUp === "p_nword") {
        this.colouring('#BF0000', eggMuslim, eggMuslimTyped);
      } else { 
        //chicken and white
        this.colouring('white', eggDefault, eggTyped);
        this.colouring(currentBlindColour, eggDefault, eggTyped);
      }
    }       
  }
}

export default sketch;