const errorUserHandler = (err,req,res,next) => {
    switch (err.code) {
        case `23505`:
            res.status(400).json(err.detail)
            break;
        default:
            break;
    }
}

export {
    errorUserHandler
}