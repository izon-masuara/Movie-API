const coma = (payload) => {
    let arrGenre = []
    let string = ''
    for (let i = 0; i < payload.length; i++) {
        if (payload[i] === ',') {
            arrGenre.push(string)
            string = ''
        } else if (payload[i] === payload[payload.length - 1]) {
            string += payload[i]
            arrGenre.push(string)
        } else {
            string += payload[i]
        }
    }
    return arrGenre
}

export {
    coma
}