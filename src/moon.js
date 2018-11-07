import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import moonImg from '../img/moon.png'
import { W, H } from './constants'
import { randomInt } from './util.js'


const moon = {
    load: () => {
        const loader = new PIXI.loaders.Loader()
        loader.add('moonImg', moonImg)

        return new Promise((resolve, reject) => {
            loader.load((loader, resources) => {
                const moon = new PIXI.Sprite.fromImage(resources.moonImg.url)
                moon.cacheAsBitmap = true
                moon.width = W/4
                moon.height = W/4
                moon.x = randomInt(0, W - moon.width)
                moon.y = randomInt(0, -moon.height/2)
                moon.alpha = 0.7
                resolve(moon)
            })
        })
    }
}

export default moon