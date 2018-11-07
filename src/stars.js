import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import star1Img from '../img/star1.png'
import star2Img from '../img/star2.png'
import star3Img from '../img/star3.png'

import { W, H } from './constants'
import { random, randomInt } from './util'

const _stars = new PIXI.Container()

const stars = {
    load: () => {
        const loader = new PIXI.loaders.Loader()
        loader.add('star1Img', star1Img)
        loader.add('star2Img', star2Img)
        loader.add('star3Img', star3Img)

        return new Promise((resolve, reject) => {
            loader.load((loader, resources) => {
                const sprites = [ 
                        ...createSprites(resources.star1Img, randomInt(8, 15)), 
                        ...createSprites(resources.star1Img, randomInt(8, 15), 0x0000f0), 
                        ...createSprites(resources.star2Img, randomInt(8, 15)), 
                        ...createSprites(resources.star3Img, randomInt(8, 15))
                      ]
                sprites.forEach(each => _stars.addChild(each))
                resolve(_stars)
            })
        })
    },

    update: delta => {
       _stars.children.forEach(star => star.alpha = random(.2, .4))
    }
}

function createSprites(resource, amount = 10, tint) {
    const sprites = []
    let sprite
    for(let i=0; i<amount; i++) {
        sprite = new PIXI.Sprite.fromImage(resource.url)
        sprite.x = randomInt(0, W)
        sprite.y = randomInt(0, H/4)
        sprite.alpha = random(0, .5)
        sprite.tint = tint || sprite.tint
        sprites.push(sprite)
    }
    return sprites
}

export default stars