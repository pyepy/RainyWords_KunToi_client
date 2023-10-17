function sketch(p, wordList) {
  let rain = [];
  let words = ["joe", "ligma", "bro", "stupid", "amogus"];
  //let words = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','100','101','102','103','104','105','106','107'];
  let bgcolor = p.color(100, 100, 100);
  let fontSize = 40; // Define the font size as a public variable

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 30; // Set your desired frame rate
  let numWordsFall = 3; // Number of words falling
  let canvasWidth = p.windowWidth * 3 / 4;
  let canvasHeight = p.windowHeight;
  let typedWord = ''; // Accumulated typed word
  let textshow = ''; // Text appearing
  let score = 0;
  // Timer variables
  let lastTime = 0;
  let deltaTime = 0;
  let fallingSpeed = 120; // Adjust this value to control the falling speed default = 120
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(frameRate);

    for (let i = 0; i < numWordsFall; i++) {
      rain[i] = new Rain();
    }
  };

  p.draw = function () {
    p.background(bgcolor);
    

    // Calculate deltaTime
    let currentTime = p.millis();
    deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    for (let i = 0; i < rain.length; i++) {
      rain[i].update(deltaTime);
      rain[i].display();
      if (typedWord === rain[i].word) {
        rain[i].reset();
        console.log("---SUCCESS---");
        // console.log(Object.values(rain))
        typedWord = '';
        score += 1;
      }
    }
    p.fill(255, 255, 255);
    p.text(typedWord, (canvasWidth / 2) -100 , 750);
    p.text("Score: " + score, 20, 100);
  };

  p.keyTyped = function () {
    if (p.key === 'Enter') {
      typedWord = '';
  } else if (p.key === 'Backspace') {
    typedWord = typedWord.substring(0, typedWord.length - 1); // Remove the last character
  }
    else {
      typedWord = typedWord + p.key;
    }
  };

  class Rain {
    constructor() {
      this.x = p.random(0, canvasWidth - 40);
      this.y = p.random(0, -canvasHeight);
      this.word = words[Math.floor(p.random(words.length))];
      this.length = fontSize * 1.5;
    }

    update(deltaTime) {
      this.y = this.y + fallingSpeed * deltaTime; // Adjust position based on speed
      if (this.y > p.height - p.windowHeight / 4) {
        this.reset();
      }
    }

    display() {
      p.noStroke();
      p.fill(255, 200);
      p.textSize(fontSize);
      p.text(this.word, this.x, this.y);
    }

    reset() {
      this.x = p.random(0, canvasWidth - 40); // set margin
      this.y = p.random(0, -canvasHeight);
      this.word = words[Math.floor(p.random(words.length))];
    }
  }
}

export default sketch;