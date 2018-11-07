import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import skyImg from '../img/sky.png'
import { randomInt } from './util.js'
import { W, H } from './constants'

const sky = {
    load: () => {
        const loader = new PIXI.loaders.Loader()
        loader.add('skyImg', skyImg)

        return new Promise((resolve, reject) => {
            loader.load((loader, resources) => {
                const sky = new PIXI.Sprite.fromImage(resources.skyImg.url)
                sky.cacheAsBitmap = true
                sky.width = W
                sky.height = H
                sky.tint = randomInt(0x606060, 0xffffff)
                resolve(sky)
            })
        })
    }
}

export default sky