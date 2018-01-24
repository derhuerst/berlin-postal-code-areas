'use strict'

const path = require('path')

const shapeIds = require('./list.json')

const dir = path.join(__dirname, 's')

const pathForShape = (file) => {
	if ('string' !== typeof file) throw new Error('file must be a string')
	if (file.length === 0) throw new Error('file is invalid')
	return path.join(dir, file)
}

const shapes = (code) => {
	if ('string' !== typeof code) throw new Error('code must be a string')
	if (code.length === 0) throw new Error('code is invalid')
	return shapeIds[code] || null
}

shapes.pathForShape = pathForShape
module.exports = shapes
