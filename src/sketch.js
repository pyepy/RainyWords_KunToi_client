function sketch(p,wordList) {
  let rain = [];
  let words = wordList;
  let bgcolor = p.color(100, 100, 100);
  let fontSize = 40; // Define the font size as a public variable

  //-------------------------------------------------------------------------------------------------------------
  let frameRate = 5; //falling speed
  let numWordsFall = 3 //number of words falling
  let canvasWidth = p.windowWidth *3 / 4
  let canvasHeight = p.windowHeight
  //-------------------------------------------------------------------------------------------------------------

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight); // Width half of the screen, full height
    p.frameRate(frameRate); // Set the frame rate to control the falling speed

    for (let i = 0; i < numWordsFall; i++) {
      rain[i] = new Rain();
      //rain[i].splash();
    }
  };

  p.draw = function () {
    p.background(bgcolor);

    for (let i = 0; i < rain.length; i++) {
      rain[i].dropRain();
    }
  };

  class Rain {
    constructor() {
      this.x = p.random(0, canvasWidth - words.length);
      this.y = p.random(0, -canvasHeight); // Adjust the initial position
      this.word = words[Math.floor(p.random(words.length))];
      this.length = fontSize * 1.5;
    }

    dropRain() {
      p.noStroke();
      p.fill(255, 200);
      p.textSize(fontSize);
      p.text(this.word, this.x, this.y);
      this.y = this.y + fontSize;
      if (this.y > p.height - p.windowHeight/4) {
        // Reset when it goes off the canvas
        this.y = p.random(0, -canvasHeight); // Adjust the reset position
        this.word = words[Math.floor(p.random(words.length))];
        this.length = fontSize * 1.5;
      }
    }

    // splash() {
    //   p.strokeWeight(2);
    //   p.stroke(245, this.opacity);
    //   p.noFill();
    //   if (this.y > 400) { // Adjusted value to trigger the splash earlier
    //     p.textSize(fontSize); // Use the public font size variable
    //     p.text(this.word, this.x, 550);
    //     this.r++;
    //     this.opacity = this.opacity - 10;
    //     if (this.opacity < 0) {
    //       this.y = p.random(0, -1000);
    //       this.word = words[Math.floor(p.random(words.length))];
    //       this.length = fontSize * 1.5;
    //       this.r = 0;
    //       this.opacity = 500;
    //     }
    //   }
    // }    
  }
}

export default sketch;