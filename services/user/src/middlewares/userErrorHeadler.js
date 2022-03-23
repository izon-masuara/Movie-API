const errorUserHandler = (err, req, res, next) => {
    switch (err.code) {
        case `400`:
            res.status(400).json(err.eachOfErrors)
            break;
        case `404`:
            res.status(404).json(err.message)
            break;
        case `500`:
            res.status(500).json(err.message)
            break;
        case `999`:
            res.status(400).json(err.message)
            break;
        case `998`:
            res.status(400).json(err.message)
            break;
        default:
            break;
    }
}

export {
    errorUserHandler
}