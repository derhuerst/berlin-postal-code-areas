'use strict'

const createTransform = require('transform-coordinates')
const parseGmlPolygon = require('parse-gml-polygon')
const {findIn, attrOf, textOf} = require('query-fis-broker-wfs/lib/helpers')
const simplify = require('@turf/simplify')

const transform = createTransform('25833', '4326')

const transformCoords = (x, y) => {
	const pos = transform.forward({x, y})
	return [
		Math.round(pos.x * 1000000) / 1000000,
		Math.round(pos.y * 1000000) / 1000000
	]
}

const parsePolygon = p => parseGmlPolygon(p, transformCoords)

const parseResult = (r) => {
	const id = attrOf(r, 'gml:id')
	let code = textOf(findIn(r, 'fis:spatial_name'))
	if (code) code = code.trim()

	const geometry = findIn(r, 'fis:spatial_geometry')
	const gml = geometry && geometry.children && geometry.children[0] || null
	if (!gml) {
		if (process.env.NODE_ENV === 'dev') console.error(geometry)
		throw new Error(id + ': missing gml:Polygon shape')
	}
	const shape = parsePolygon(gml)
	simplify(shape, {tolerance: .0001, highQuality: true, mutate: true})

	return {id, code, shape}
}

module.exports = parseResult
