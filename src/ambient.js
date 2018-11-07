import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import ambientSnd from '../snd/ambient.mp3'

const ambient = {
    load: () => {
        const loader = new PIXI.loaders.Loader()
        loader.add('ambientSnd', ambientSnd)

        return new Promise((resolve, reject) => {
            loader.load((loader, resources) => resolve(new Audio(resources.ambientSnd.url)))
        })
    }
}

export default ambient