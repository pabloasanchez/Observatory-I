import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters';
import skyImg from '/img/sky.png'
import moonImg from '/img/moon.png'
import carImg from '/img/car.png'
import star1Img from '/img/star1.png'
import star2Img from '/img/star2.png'
import star3Img from '/img/star3.png'
import citySnd from '/snd/ambient.mp3'

const W = 800, H = 600
const sounds = {}, sprites = {}

// Filters
const reflectionFilter = new filters.ReflectionFilter({ 
    amplitude: [0, .7],
    waveLength: [0, 1],
    boundary: 0.77,
    alpha: [.33, .4]
})


PIXI.loader.add('skyImg', skyImg)
           .add('moonImg', moonImg)
           .add('carImg', carImg)
           .add('star1Img', star1Img)
           .add('star2Img', star2Img)
           .add('star3Img', star3Img)
           .add('citySnd', citySnd)

PIXI.loader.load((loader, resources) => {
    sounds.city =        new Audio(resources.citySnd.url)
    sprites.background = new PIXI.Sprite.fromImage(resources.skyImg.url)
    sprites.moon =       new PIXI.Sprite.fromImage(resources.moonImg.url)
    sprites.cars =       createCars(resources.carImg, 8)
    sprites.carsBwd =    createCars(resources.carImg, 20, 0xff0000)
    sprites.stars =      [ ...createStars(resources.star1Img, 15), 
                           ...createStars(resources.star1Img, 15, 0x0000f0), 
                           ...createStars(resources.star2Img, 15), 
                           ...createStars(resources.star3Img, 15) ]

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

    function createStars(resource, amount = 10, tint) {
        const stars = []
        let star
        for(let i=0; i<amount; i++) {
            star = new PIXI.Sprite.fromImage(resource.url)
            star.x = randomInt(0, W)
            star.y = randomInt(0, H/4)
            star.alpha = random(0, .5)
            star.tint = tint || star.tint
            stars.push(star)
        }
        return stars
    }
});

let app = new PIXI.Application(W, H, { antialias: true })
app.stage.filters = [reflectionFilter]
document.body.appendChild(app.view)
PIXI.loader.onComplete.add(init)

function init() {
    //Background Sound
    sounds.city.loop = true
    sounds.city.play()

    // Background
    sprites.background.cacheAsBitmap = true
    sprites.background.width = W
    sprites.background.height = H
    app.stage.addChild(sprites.background)

    //Stars
    sprites.stars.forEach(star => app.stage.addChild(star))

    //Moon
    sprites.moon.cacheAsBitmap = true
    sprites.moon.width = W - W/4
    sprites.moon.height = W - W/4
    sprites.moon.x = W-sprites.moon.width/1.5
    sprites.moon.y = -100
    sprites.moon.alpha = 0.5
    app.stage.addChild(sprites.moon)

    // Water
    const water = new PIXI.Graphics()
    water.beginFill(0x050505)
    water.alpha = .9
    water.drawRect(0, H - 150, W, 150)
    water.cacheAsBitmap = true
    app.stage.addChild(water)

    // Buildings
    //Background buildings
    const backBuildings = createBuildings(10, 0x050505, [new PIXI.filters.BlurFilter(2.5)])
    backBuildings.alpha = 0.25
    app.stage.addChild(backBuildings)

    const farBuildings = createBuildings(15, 0x090909, [new PIXI.filters.BlurFilter(1)])
    farBuildings.alpha = 0.6
    app.stage.addChild(farBuildings)

    //Main buildings 0x0a0a0a
    const buildings = createBuildings(0, 0x0f0f0f, [new PIXI.filters.BlurFilter(.2)])
    buildings.alpha = 0.96
    app.stage.addChild(buildings)

    //Cars
    sprites.cars.forEach(car => app.stage.addChild(car))
    sprites.carsBwd.forEach(car => app.stage.addChild(car))

    //Main loop
    app.ticker.add(function(delta) {
        sprites.cars.forEach(car => car.x = car.x > W + car.width? -car.width : car.x + car.speed * delta)
        sprites.carsBwd.forEach(car => car.x = car.x < 0 + car.width? W + car.width : car.x - (car.speed * delta))

        reflectionFilter.time += 0.1 * delta

        sprites.stars.forEach(star => star.alpha = random(.2, .4))
        buildings.children.forEach(
            building => building.children.forEach(
                (window, i) => window.alpha = i==0? window.alpha : random(0.4, 0.5)))
    })
}

function createBuildings(offset=0, fill=0, filters) {
    const buildings = new PIXI.Container()
    let building, structure, window

    for(let i=0 + offset, h; i<W; i+=50) {
        building = new PIXI.Container()
        
        structure = new PIXI.Graphics()
        structure.cacheAsBitmap = true
        h = randomInt(25, 250)
        let y = H - h - 150

        structure.beginFill(0x090909)
        structure.drawRect(i+15, y, 45, h)

        structure.beginFill(fill)
        structure.drawRect(i, y + 1, 45, h)
        
        building.addChild(structure)
        
        for(let j=0; j<50; j+=10) {
            window = new PIXI.Graphics()
            for(let k=5; k<h; k+=10) {
                window.alpha = 0.4
                window.beginFill(chance()? 0xDAFF7F : 0x06333F)
                window.drawRect(i + j + 2, y + k, 2, 2)
            }
            building.addChild(window)
        }
        buildings.addChild(building)
    }
    buildings.filters = filters || buildings.filters
    return buildings
}

function randomInt(min, max) {
    return Math.floor(random(min, max))
}

function random(min, max) {
    return Math.random() * (max - min) + min
}

function chance(probability = .5) {
    return Math.random() <= probability
}