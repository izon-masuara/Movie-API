import Users from "../db/model/user"

export const getAllUser = async (req,res,next) => {

    try {
        const data = await Users.findAll()
        res.status(200).json(data.rows)
    } catch (err) {
        console.log(err)
    }

    // res.status(200).json(data)
}