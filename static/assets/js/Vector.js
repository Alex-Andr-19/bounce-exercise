class Vector {

	constructor(options) {
		this.x1 = options.x1
		this.y1 = options.y1

		this.cords = [options.x, options.y]

		this.angle = options.angle

		this.l = Math.sqrt(Math.pow(this.cords[0], 2) + Math.pow(this.cords[1], 2))
		this.normolized = [0, 0]
		if (this.l) {
			this.normolized = [this.cords[0] / this.l, this.cords[1] / this.l]
		}

		this.normVector = [-this.cords[1], this.cords[0]]
	}
}

function plusV(a, b) {
	let options = {
		x1: a.x1, 
		y1: a.y1, 
		x: a.cords[0] + b.cords[0], 
		y: a.cords[1] + b.cords[1]
	}
	return new Vector(options)
}

function minusV(a, b) {
	let options = {
		x1: a.x1, 
		y1: a.y1, 
		x: a.cords[0] - b.cords[0], 
		y: a.cords[1] - b.cords[1]
	}
	return new Vector(options)
}

function multVV(a, b) {
	return a.cords[0]*b.cords[0] + a.cords[1]*b.cords[1]
}

function multVI(a, d) {
	a.cords[0] *= d
	a.cords[1] *= d

	return a
}

function getCos(a, b) {
	return multVV(a, b)/(a.l*b.l)
}

function plane(a, b) {
	let newVL = multVV(a, b)/b.l

	options = {
		x1: b.x1,
		y1: b.y1,
		x: b.cords[0]/b.l*newVL,
		y: b.cords[1]/b.l*newVL
	}

	return new Vector(options)
}

function reflectByNormal(vector, normal) {
	let planeV = plane(vector, normal)
	return minusV(multVI(planeV, 2), vector).cords
}