'use strict'

const createTransform = require('transform-coordinates')
const parseGmlPolygon = require('parse-gml-polygon')
const {findIn, attrOf, textOf} = require('query-fis-broker-wfs/lib/helpers')

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

	const polygon = findIn(r, 'fis:spatial_geometry', 'gml:Polygon')
	if (!polygon) throw new Error(id + ': missing gml:Polygon shape')
	const shape = parsePolygon(polygon)

	return {id, code, shape}
}

module.exports = parseResult
