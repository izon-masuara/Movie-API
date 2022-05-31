import { decodeJwt } from "../helpers/jsonwebtoken"

export const auth = async (req,res,next) => {
    const userID = await decodeJwt(req.headers.access_token)
    req.id = userID
    next()
}