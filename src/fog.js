import 'babel-polyfill'

import * as PIXI from 'pixi.js'
import { randomInt, random } from './util.js'
import { W, H } from './constants'
import fogImg from '../img/fog.png'

const fog = {
    load: () => {
        const loader = new PIXI.loaders.Loader()
        loader.add('fogImg', fogImg)

        return new Promise((resolve, reject) => {
            loader.load((loader, resources) => {
                const fog = new PIXI.Sprite.fromImage(resources.fogImg.url)
                fog.cacheAsBitmap = true
                fog.width = W
                fog.height = H
                fog.tint = randomInt(0, 0xffffff)
                fog.alpha = random(.33, .66)
                resolve(fog)
            })
        })
    }
}

export default fog