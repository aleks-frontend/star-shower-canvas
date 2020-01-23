import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

// Objects
function Star({x = 0, y = 0, radius = 30, color = '#fff'}) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = {
    x: utils.randomIntFromRange(-2, 2),
    y: 5
  }
  this.gravity = 0.5
  this.friction = 0.8
}

Star.prototype.draw = function () {
  c.save();
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.shadowColor = '#fff';
  c.shadowBlur = 20;
  c.fillStyle = this.color
  c.fill()
  c.closePath()
  c.restore();
}

Star.prototype.update = function () {
  this.draw()

  if (this.y + this.radius + this.velocity.y > window.innerHeight - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
    for (let i = 0; i < 8; i++) {
      miniStars.push(new MiniStar({x: this.x, y: this.y, radius: 2}));
    }
    this.radius -= 3;
  } else {
    this.velocity.y += this.gravity
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
}

function MiniStar({x = 0, y = 0, radius = 30, color = '#fff'}) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = {
    x: utils.randomIntFromRange(-5, 5),
    y: utils.randomIntFromRange(-15, 15),
  }
  this.gravity = 0.1
  this.friction = 0.8
  this.ttl = 100
  this.opacity = 1
}

MiniStar.prototype.draw = function () {
  c.save();
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.shadowColor = '#fff';
  c.shadowBlur = 20;
  c.fillStyle = `rgba(255, 255, 255, ${this.opacity} )`
  c.fill()
  c.closePath()
  c.restore();
}

MiniStar.prototype.update = function () {
  this.draw()

  if (this.y + this.radius > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.opacity -= 1 / this.ttl
}

// Implementation
let stars;
let miniStars;
let staticStars;
let ticker = 0;
let groundHeight = 100;
let moon;
const moonToggle = Math.random() > 0.7;

function init() {
  stars = []
  miniStars = []
  staticStars = []
  
  moon = new Star({
    x: utils.randomIntFromRange(0, canvas.width), 
    y: utils.randomIntFromRange(0, canvas.height - 300), 
    radius: utils.randomIntFromRange(50, 90), 
    color: '#fff'
  });

  stars.push(new Star({
    width: canvas.width / 2, 
    height: 30, 
    radius: 15, 
    color: 'white'})
  );

  for ( let i = 0; i < 60; i++ ) {
    const xPos = utils.randomIntFromRange(0, canvas.width);
    const yPos = utils.randomIntFromRange(0, canvas.height) - 200;
    const radius = utils.randomIntFromRange(0.5, 3);

    staticStars.push(new Star({
      x: xPos, 
      y: yPos, 
      radius: radius, 
      color: 'white'})
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  const bgGradient = c.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, '#01010d');
  bgGradient.addColorStop(1, '#402b70');

  c.fillStyle = bgGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);

  if ( moonToggle ) moon.draw();

  staticStars.forEach(staticStar => {
    staticStar.draw();
  });

  c.fillStyle = 'black';
  c.fillRect(0, canvas.height - groundHeight, canvas.width, canvas.height);

  stars.forEach((star, index) => {
    star.update();
    if (star.radius === 0) {
      stars.splice(index, 1)
    }
  })

  miniStars.forEach((miniStar, index) => {
    miniStar.update();
    if (miniStar.ttl === 0) {
      miniStars.splice(index, 1)
    }
  });


  if ( ticker % utils.randomIntFromRange(75, 200) === 0 ) {
    const xPos = utils.randomIntFromRange(0, canvas.width);
    let starWidth;
    const starWidthHelper = Math.random();

    if ( starWidthHelper < 0.3 ) {
      starWidth = 9;
    } else if ( starWidthHelper > 0.3 && starWidthHelper < 0.6 ) {
      starWidth = 12;
    } else {
      starWidth = 15;
    }
    
    stars.push(new Star({
      x: xPos, y: 0, radius: starWidth, color: 'white'
    }));
  }

  ticker++;
}

init()
animate()
