export const auth = (req,res,next) => {
    console.log(req.headers.status)
    if(req.headers.status === undefined || req.headers.status === 'null') {
        next({
            code : 401,
        })
    } 
    const { user_id,status } = req.headers
    req.userId = user_id
    status === undefined ? next({code : 401}) : next()
}