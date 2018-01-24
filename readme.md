# berlin-postal-code-areas

[![Greenkeeper badge](https://badges.greenkeeper.io/derhuerst/berlin-postal-code-areas.svg)](https://greenkeeper.io/)

**The shapes of all [ZIP code](https://en.wikipedia.org/wiki/Postal_codes_in_Germany) areas in Berlin as [GeoJSON](http://geojson.org).**

[![npm version](https://img.shields.io/npm/v/berlin-postal-code-areas.svg)](https://www.npmjs.com/package/berlin-postal-code-areas)
[![build status](https://api.travis-ci.org/derhuerst/berlin-postal-code-areas.svg?branch=master)](https://travis-ci.org/derhuerst/berlin-postal-code-areas)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/berlin-postal-code-areas.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install berlin-postal-code-areas
```


## Usage

```js
const shapes = require('berlin-postal-code-areas')
const {pathForShape} = shapes

const shapeFile = shapes('10555')
const path = pathForShape(shapeFile)

const shape = require(path)
console.log(shape)
```

```js
{
	type: 'Polygon',
	coordinates: [ [
		[13.32878,52.52244],
		[13.328878,52.522348],
		[13.328897,52.522331],
		[13.328899,52.52232],
		[13.32889,52.522312],
		[13.328881,52.522308],
		// …
	] ]
}
```


## Related

- [german-administrative-areas](https://github.com/juliuste/german-administrative-areas) – German administrative areas as GeoJSON.
- [gemeindeverzeichnis](https://github.com/juliuste/gemeindeverzeichnis) – German „Gemeindeverzeichnis“ (vaguely 'community register') containing all federal entities.


## Contributing

If you have a question or have difficulties using `berlin-postal-code-areas`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/berlin-postal-code-areas/issues).
