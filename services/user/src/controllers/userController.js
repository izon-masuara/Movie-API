import Users from "../db/model/user"
import { sendMail } from "../helpers/nodemailer"

const getAllUser = async (req, res, next) => {
    try {
        const data = await Users.findAll()
        res.status(200).json(data.rows)
    } catch (err) {
        next({
            code: `500`,
            message: `internal server error`
        })
    }
}

const createUser = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await Users.createUser(payload)
        // sendMail(data.email)
        res.status(201).json(`Email with name ${data.email} created`)
    } catch (err) {
        next(err)
    }
}

const updateStatus = async (req, res, next) => {
    const id = +req.params.id
    const status = req.status
    try {
        const found = await Users.findByID(id)
        if(!found){
            throw({
                code: `404`,
                message: `Data not found`
            })
        }
        const user_id = found.rows[0].user_id
        const success = await Users.updateStatus(status, user_id)
        res.status(200).json(`Email ${success.email} success updated with status ${success.status}`)
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req,res,next) => {
    const id = +req.params.id
    try {
        const found = await Users.findByID(id)
        if(!found){
            throw({
                code: `404`,
                message: `Data not found`
            })
        }
        const user_id = found.rows[0].user_id
        await Users.destroy(user_id)
        res.status(200).json(`User with email ${found.rows[0].email} has been deleted`)
    } catch (err) {
        next(err)
    }
}

export {
    getAllUser,
    createUser,
    updateStatus,
    deleteUser
}