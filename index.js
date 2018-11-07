import 'babel-polyfill'

import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'

import fog from './src/fog'
import sky from './src/sky'
import moon from './src/moon'
import cars from './src/cars'
import water from './src/water'
import stars from './src/stars'
import ambient from './src/ambient'
import buildings from './src/buildings'
import reflection from './src/reflection'
import { W, H } from './src/constants'

const app = new PIXI.Application({ width: W, height: H })
document.body.appendChild(app.view)

init()

async function init() {
    await add(sky)
    await add(stars) // await add(moon)  //Uncomment for 🌜
    await add(water)
    await add(buildings)
    await add(cars)
    await add(fog)
    await filter(reflection)

    animate(cars, stars, buildings, reflection)
    play(ambient)
}

async function filter(f) {
    app.stage.filters = [f.filter]
}

async function add(resource) {
    app.stage.addChild(await resource.load())
}

async function play(resource, loop=true) {
    const snd = await resource.load()
    snd.loop = loop
    snd.play()
}

function animate(...containers) {
    app.ticker.add(delta => containers.forEach(container => container.update(delta)))
}