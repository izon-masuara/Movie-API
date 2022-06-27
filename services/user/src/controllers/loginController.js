import { Users, Login } from "../db/model"
import { comparePass } from "../helpers/bcrypt"
import { signJwt, decodeJwt } from '../helpers/jsonwebtoken'

const loginController = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const found = await Users.findOne(`email`, email)
        const data = found[0]
        if (!found) {
            throw {
                code: `997`,
                message: `Email or password are wrong`
            }
        }
        const correctPass = comparePass(password, data.password)
        if (!correctPass) {
            throw {
                code: `997`,
                message: `Email or password are wrong`
            }
        }
        const token = signJwt(data)
        const test = await Login.login(data.user_id, token)
        res.status(200).json({ access_token: token })
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const decode = decodeJwt(req.headers.accesstoken)
        if (decode.code !== undefined) {
            throw decode
        }
        const found = await Users.findByID(+decode.id)
        if (found.rows[0] === undefined) throw {
            code: 404,
            message: 'Data not found'
        }
        const data = {
            user_id: found.rows[0].user_id,
            status: found.rows[0].status,
            role: found.rows[0].role
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

const logOut = async (req, res, next) => {
    const { id } = req.params
    try {
        const found = await Login.findById(+id)
        if (!found) {
            throw {
                code: '404',
                message: "Data not found"
            }
        }
        await Login.logOut(+id)
        res.status(200).json(`Logout`)
    } catch (err) {
        next(err)
    }
}

export {
    loginController,
    getAll,
    logOut
}