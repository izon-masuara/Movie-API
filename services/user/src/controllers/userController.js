import Users from "../db/model/user"

const getAllUser = async (req,res,next) => {
    try {
        const data = await Users.findAll()
        res.status(200).json(data.rows)
    } catch (err) {
        console.log(err)
    }
}

const createUser = async (req,res,next) => {
    const payload = req.body
    try {
        const data = await Users.createUser(payload)
        res.status(201).json(`Email with name ${data.email} created`)
    } catch (err) {
        next(err.validation)
    }
}

export {
    getAllUser,
    createUser
}