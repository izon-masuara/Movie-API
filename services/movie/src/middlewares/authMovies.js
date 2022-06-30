export const auth = (req,res,next) => {
    if(req.headers.status !== 'active') {
        next({
            code : 401,
        })
    } 
    const { user_id,status } = req.headers
    req.userId = user_id
    status === undefined ? next({code : 401}) : next()
}