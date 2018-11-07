function randomInt(min, max) {
    return Math.floor(random(min, max))
}

function random(min, max) {
    return Math.random() * (max - min) + min
}

function chance(probability = .5) {
    return Math.random() <= probability
}

export { randomInt, random, chance }