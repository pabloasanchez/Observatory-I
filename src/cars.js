import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import carImg from '../img/car.png'

import { W, H } from './constants'
import { random, randomInt } from './util'

let _cars, _carsBwd

const cars = {
    load: () => {
        const loader = new PIXI.loaders.Loader()
        loader.add('carImg', carImg)

        return new Promise((resolve, reject) => {
            loader.load((loader, resources) => {
                const cars = new PIXI.Container()
                _cars =    createCars(resources.carImg, 8)
                _carsBwd = createCars(resources.carImg, 20, 0xff0000)
                _cars.forEach(car => cars.addChild(car))
                _carsBwd.forEach(car => cars.addChild(car))
                resolve(cars)
            })
        })
    },

    update: delta => {
        _cars.forEach(car => car.x = car.x > W + car.width? -car.width : car.x + car.speed * delta)
        _carsBwd.forEach(car => car.x = car.x < 0 + car.width? W + car.width : car.x - (car.speed * delta))
    }
}

function createCars(resource, amount = 1, tint) {
    const cars = []
    let car
    for(let i=0; i<amount; i++) {
        car = new PIXI.Sprite.fromImage(resource.url)
        car.x = randomInt(0, W)
        car.y = H-randomInt(142,146)
        car.speed = random(0.1, 0.2)
        car.tint = tint || car.tint
        cars.push(car)
    }
    return cars
}

export default cars