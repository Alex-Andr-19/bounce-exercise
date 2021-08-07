const frameRate = 1000 / 60
let timeInfo
let wallList = []


let v = new Vector({x1:2, 
	                y1:2, 
	                x:11, 
	                y:0})
let vn = new Vector({x1: 0,
					 y1: 0,
					 x: v.normVector[0],
					 y: v.normVector[1]})

let a = new Vector({x1:4, 
	                y1:6, 
	                x:4, 
	                y:-4})	                

console.log(reflectByNormal(a, v))

function between(x, a, b) {
	if (x >= a && x <= b) {
		return true
	}
	return false
}

function isCollide(rect1, rect2) {
	if (between(rect1.x, rect2.x, rect2.x+rect2.w) && 
		between(rect1.y, rect2.y, rect2.y+rect2.h)) {
		return true
	}
	if (between(rect1.x+rect1.w, rect2.x, rect2.x+rect2.w) &&
		between(rect1.y, rect2.y, rect2.y+rect2.h)) {
		return true
	}
	if (between(rect1.x, rect2.x, rect2.x+rect2.w) &&
		between(rect1.y+rect1.h, rect2.y, rect2.y+rect2.h)) {
		return true
	}
	if (between(rect1.x+rect1.w, rect2.x, rect2.x+rect2.w) &&
		between(rect1.y+rect1.h, rect2.y, rect2.y+rect2.h)) {
		return true
	}
	if (between(rect1.y, rect2.y, rect2.y+rect2.h) && 
		rect1.x < rect2.x && rect1.x+rect1.w > rect2.x){
		return true
	}
	if (between(rect1.x, rect2.x, rect2.x+rect2.w) && 
		rect1.y > rect2.y && rect1.y+rect1.h < rect2.y){
		return true
	}

	return false
}

class Wall extends Vector {

	constructor(options) {
		super(options)
		this.color = options.color
		this.name = options.name

		this.angle = options.angle
		this.h = 15

		this.xFact = this.x1
		this.yFact = this.y1 + this.h

		this.obj = document.getElementById(this.name)
	}

	init() {
		this.obj.style.setProperty('--left', this.x1+'px')
		this.obj.style.setProperty('--bottom', this.y1+'px')
		
		this.obj.style.setProperty('--width', this.l+'px')

		this.obj.style.setProperty('--bgColor', this.color)

		this.obj.style.setProperty('--rotate', this.angle + 'grad')
	}

}

window.addEventListener('load', () => {
	
	setTimeout(() => {

		let ball = new Ball({
			color: 'red',
			cords: [400, 500],
			mass: 2
		})

		let wall1 = new Wall({
			color: 'green',
			x1: 270,
			y1: 300,
			x: 200,
			y: 100,
			angle: 0,
			name: 'wall1'
		})

		ball.init()

		wallList.push(wall1)
		// wall1.init()

		let schetchick = setInterval(() => {
			ball.tick()
		}, frameRate)

	}, 300)

})

