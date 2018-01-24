'use strict'

const path = require('path')
const fs = require('fs')
const createQueue = require('queue')

const processTile = require('./process-tile')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const writeList = (data, cb) => {
	const dest = path.join(__dirname, '..', 's', 'list.json')
	fs.writeFile(dest, JSON.stringify(data), cb)
}

const berlin = [416868 - 10, 5799302 + 10, 369095 + 10, 5838240 - 10]
const list = Object.create(null) // code -> shape ID

const queue = createQueue({concurrency: 4, autostart: true})
queue.on('error', showError)

const [maxX, minY, minX, maxY] = berlin
const dX = (maxX - minX) / 40
const dY = (maxY - minY) / 40
for (let x = minX; x < maxX; x += dX) {
	for (let y = minY; y < maxY; y += dY) {
		const tile = [
			Math.floor(x + dX), // max X
			Math.floor(y), // min Y
			Math.floor(x), // min X
			Math.floor(y + dY) // max Y
		]

		queue.push(processTile(list, tile))
	}
}

queue.once('end', () => {
	writeList(list, (err) => {
		if (err) showError(err)
	})
})
