import { Users, Login } from "../db/model"
import { comparePass } from "../helpers/bcrypt"
import { signJwt } from '../helpers/jsonwebtoken'

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
        await Login.login(data.user_id,token)
        res.status(200).json({ access_token: token })
    } catch (err) {
        next(err)
    }
}

export {
    loginController,
}