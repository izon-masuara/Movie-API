export const errHandlers = (err,req,res,next) => {
    switch (err.code) {
        case 401:
            res.status(err.code).json({status : 'access danied'})
        default:
            break;
    }
}