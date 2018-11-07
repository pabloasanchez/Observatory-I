import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'
import { W, H } from './constants'
import { randomInt, random, chance } from './util.js'

const _buildings = new PIXI.Container()

const buildings = {
    load: () => {
        return new Promise((resolve, reject) => {
            _buildings.addChild(createBuildings(10, 0x050505, 0.25, [new PIXI.filters.BlurFilter(2.5)]))
            _buildings.addChild(createBuildings(15, 0x090909, 0.6, [new PIXI.filters.BlurFilter(1)]))
            _buildings.addChild(createBuildings(0, 0x0f0f0f, 0.97, [new PIXI.filters.BlurFilter(.2)]))
            resolve(_buildings)
        })
    },

    update: delta => {
        let buildings = _buildings.children[2]
        buildings.children.forEach(
          building => 
            building.children.forEach(
              (window, i) => 
                window.alpha = i==0? window.alpha : random(0.38, 0.5)))
    }
}

function createBuildings(offset=0, fill=0, alpha=1, filters) {
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
    buildings.alpha = alpha
    return buildings
}

export default buildings