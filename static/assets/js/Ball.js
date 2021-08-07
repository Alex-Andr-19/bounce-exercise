class Ball {
	static type = 'BALL'

	constructor(options) {
		this.color = options.color
		this.cords = options.cords
		this.rotate = 0

		this.V = [0, 1.5]
		this.a = [0, 0]
		
		this.g = -.25/70
		this.wind = 0
		this.bounce = .5

		this.maxForceDistance = 100
		this.minForceDistance = 550
		this.clickForce = 1.5

		this.timeScale = 1
	}

	init() {
		timeInfo = document.getElementById('textInfo')
		window.addEventListener('wheel', e => {
			this.timeScale = Math.max(0, Math.min(3, this.timeScale - Math.sign(e.deltaY)*.1))
		})

		this.obj = document.getElementById('ball')

		this.radius = 32

		this.objParSize = [this.obj.parentElement.offsetWidth, this.obj.parentElement.offsetHeight]

		this.obj.style.display = 'block'
		this.applyCoords()

		this.obj.parentElement.addEventListener('click', (ev) => {
			let x = ev.clientX - this.cords[0] - this.radius
			let y = this.objParSize[1] - ev.clientY - this.cords[1] - this.radius

			let l = Math.sqrt(x*x + y*y)
			if (l < this.minForceDistance) {
				let curForce = Math.min(this.maxForceDistance / l, 1)

				// Normolising vecto of force
				x /= l
				y /= l

				this.V[0] += -x*curForce*this.clickForce
				this.V[1] += -y*curForce*this.clickForce
			}
		})
	}

	applyCoords() {
		// Force of friction
		this.wind = -this.V[0]/5500
		if (this.wind > -0.00001 && this.wind < 0 ||
			this.wind < 0.00001 && this.wind > 0) {
			this.wind = 0
			this.V[0] = 0
		}

		// Nice look animate
		this.rotate += this.V[0]*12*this.timeScale
		this.rotate %= 360
		this.obj.style.setProperty('--transform-rotate', this.rotate + 'deg')

		wallList.forEach(wall => {
			console.log(isCollide({
				x: this.cords[0],
				y: this.cords[1],
				w: 64,
				h: 64
			},
			{
				x: wall.xFact,
				y: wall.yFact,
				w: wall.cords[0],
				h: wall.h,
			}))
		})

		// Bottom bounce
		if (this.cords[1] <= 0) {
			this.V[1] *= -this.bounce
			this.cords[1] = 0
		}
		// Top bounce
		if (this.cords[1] >= this.objParSize[1] - 2*this.radius) {
			this.V[1] *= -1
			this.cords[1] = this.objParSize[1] - 2*this.radius
		}
		// Right bounce
		if (this.cords[0] >= this.objParSize[0] - 2*this.radius) {
			this.V[0] *= -this.bounce
			this.cords[0] = this.objParSize[0] - 2*this.radius
		}
		// Left bounce
		if (this.cords[0] <= 0) {
			this.V[0] *= -this.bounce
			this.cords[0] = 0
		}


		// Reset cords
		this.obj.style.left = this.cords[0] + 'px'
		this.obj.style.bottom = this.cords[1] + 'px'
	}

	tick() {
		timeInfo.innerText = Math.round(this.timeScale * 100)/100

		let newFrameRate = frameRate*this.timeScale

		// X
		this.cords[0] += this.V[0]*newFrameRate + (this.a[0]+this.wind)*Math.pow(newFrameRate, 2)/2
		this.V[0] += (this.a[0]+this.wind)*newFrameRate
		
		// Y
		this.cords[1] += this.V[1]*newFrameRate + (this.a[1]+this.g)*Math.pow(newFrameRate, 2)/2
		this.V[1] += (this.a[1]+this.g)*newFrameRate

		this.applyCoords()
	}
}