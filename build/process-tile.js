'use strict'

const fs = require('fs')
const path = require('path')
const getFeatures = require('query-fis-broker-wfs/get-features')
const {Writable} = require('stream')

const parseResult = require('./parse-result')

const endpoint = 'https://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_postleit'
const layer = 'fis:re_postleit'

const writeShape = (id, shape, cb) => {
	const dest = path.join(__dirname, '..', 's', id + '.json')
	fs.writeFile(dest, JSON.stringify(shape), cb)
}

const list = Object.create(null) // code -> shape ID

const processTile = (list, bbox) => {
	const run = (cb) => {
		let done = false
		const onError = (err) => {
			if (done) return
			done = true
			cb(err)
		}
		const onFinish = () => {
			if (done) return
			done = true
			cb()
		}

		const onResult = (res, _, cb) => {
			try {
				res = parseResult(res)
			} catch (err) {
				return cb(err)
			}

			if (list[res.code]) return cb() // shape already written

			writeShape(res.id, res.shape, (err) => {
				if (err) return cb(err)
				list[res.code] = res.id + '.json'
				console.info(res.code, '->', res.id)
				cb()
			})
		}

		getFeatures(endpoint, layer, {bbox})
		.pipe(new Writable({objectMode: true, write: onResult}))
		.once('error', onError)
		.once('finish', onFinish)
	}
	return run
}

module.exports = processTile
