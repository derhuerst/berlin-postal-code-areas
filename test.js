'use strict'

const test = require('tape')
const isValidGeoJSON = require('geojson-is-valid')

const list = require('./list.json')
const shapes = require('.')
const {pathForShape} = shapes

test('shapes: should throw if not used properly', (t) => {
	t.plan(2)
	t.throws(() => shapes())
	t.throws(() => shapes(''))
})

test('shapes: should return null for non-existent codes', (t) => {
	t.plan(1)
	t.equal(shapes('1234567'), null)
})

test('shapes: should return a list of shapes', (t) => {
	const shapeId = shapes('10555')
	t.ok(shapeId)
	t.equal(typeof shapeId, 'string')
	t.end()
})

test('pathForShape: should throw if not used properly', (t) => {
	t.plan(2)
	t.throws(() => pathForShape())
	t.throws(() => pathForShape(''))
})

test('pathForShape: should return a valid GeoJSON shape file', (t) => {
	t.plan(4)
	const path = pathForShape(list['10555'])
	t.ok(path)
	t.equal(typeof path, 'string')
	if ('string' === typeof path) {
		const shape = require(path)
		t.ok(shape)
		t.ok(isValidGeoJSON(shape))
	}
})
