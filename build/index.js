'use strict'

// const fs = require('fs')
// const path = require('path')

const processTile = require('./process-tile')

const bbox = [387000, 5812000, 386000, 5813000] // todo: all of Berlin
const list = Object.create(null) // code -> shape ID

processTile(list, bbox, (err) => {
	if (!err) return
	console.error(err)
	process.exit(1)
})

// todo: write list
