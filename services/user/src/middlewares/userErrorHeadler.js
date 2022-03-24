const errorUserHandler = (err, req, res, next) => {
    switch (err.code) {
        case `400`:
            // error validation when create user
            // error when email does not send
            res.status(400).json(err.eachOfErrors)
            break;
        case `404`:
            // error when data not found
            res.status(404).json(err.message)
            break;
        case `500`:
            // Internal server error
            res.status(500).json(err.message)
            break;
        case `999`:
            res.status(400).json(err.message)
            break;
        case `998`:
            // error when transaction in midtrans faild
            res.status(400).json(err.message)
            break;
        case `997`:
            // error login when email or password are wrong
            res.status(400).json(err.message)
            break;
        case `996`:
            // error from database get login_users 
            res.status(400).json(err.message)
            break;
        case `23505`:
            res.status(400).json(err.constraint)
            break
        default:
            break;
    }
}

export {
    errorUserHandler
}