import { database as db } from "../db/config"

const getAll = async (req,res,next) => {
    try {
        const data = await db.find().toArray()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

export {
    getAll
}