import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'

import { W, H } from './constants'

const 
x = 0, 
y = H-180, 
width = W, 
height = H/3, 
color = 0x050505, 

water = { 
    load: () => {
        const water = new PIXI.Container()
        water.addChild(createWater(x, y, width, height, color))
        return Promise.resolve(water)
    }
}

function createWater(x, y, width, height, fill) {
    const water = new PIXI.Graphics()
    water.beginFill(fill)
    water.drawRect(x, y, width, height)
    water.alpha = .98
    return water
}

export default water