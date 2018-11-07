import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'

const reflection = {
    filter: new filters.ReflectionFilter({ 
        amplitude: [0, .8],
        waveLength: [0, 1],
        boundary: 0.77,
        alpha: [.33, .4]
        }),

    update: delta => {
        reflection.filter.time += 0.1 * delta
    }
}

export default reflection