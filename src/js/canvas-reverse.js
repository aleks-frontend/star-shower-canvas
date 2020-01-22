import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
function Star(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = {
    x: utils.randomIntFromRange(-15, 15),
    y: utils.randomIntFromRange(20, 50),
  }
  this.gravity = 2
  this.friction = 0.8
}

Star.prototype.draw = function () {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = this.color
  c.fill()
  c.closePath()
}

Star.prototype.update = function () {
  this.draw()

  if (this.y + this.radius > window.innerHeight) {
    // this.velocity.y = -this.velocity.y * this.friction;
    for (let i = 0; i < 8; i++) {
      miniStars.push(new MiniStar(this.x, this.y, 2));
    }
    console.log(miniStars);
    this.radius = 0;
  } else {
    this.velocity.y -= this.gravity;
  }
  
  this.y -= this.velocity.y;
  this.x += this.velocity.x;
}

function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: utils.randomIntFromRange(-5, 5),
    y: utils.randomIntFromRange(-15, 15),
  }
  this.gravity = 0.5
  this.friction = 0.8
  this.ttl = 100
  this.opacity = 1
}

MiniStar.prototype.draw = function () {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = `rgba(255, 0, 0, ${this.opacity} )`
  c.fill()
  c.closePath()
}

MiniStar.prototype.update = function () {
  this.draw()

  if (this.y + this.radius > canvas.height) {
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
function init() {
  stars = []
  miniStars = []

  for (let i = 0; i < 5; i++) {
    stars.push(new Star(canvas.width / 2, 500, 30, 'blue'));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

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
  })
}

init()
animate()
