const errorUserHandler = (err,req,res,next) => {
    switch (err.code) {
        case `400`:
            res.status(400).json(err.eachOfErrors)
            break;
        case `500`:
            res.status(500).json(err.message)
            break;
        default:
            break;
    }
}

export {
    errorUserHandler
}