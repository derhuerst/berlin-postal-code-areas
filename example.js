'use strict'

const shapes = require('.')
const {pathForShape} = shapes

const shapeFile = shapes('10555')
const path = pathForShape(shapeFile)
const shape = require(path)
console.log(shape)
