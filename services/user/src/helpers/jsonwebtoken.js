import jwt from 'jsonwebtoken'
const privateKey = process.env.JWTSECRET

const signJwt = (payload) => {
    const user = {
        id : payload.user_id,
        email : payload.email,
        status : payload.status,
        role : payload.role
    }
    return jwt.sign(user,privateKey)
}

const decodeJwt = (payload) => {
    return jwt.verify(payload,privateKey)
}

export {
    signJwt,
    decodeJwt
}