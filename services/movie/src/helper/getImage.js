import mongoose from "mongoose"

export const getImage = async (id) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db, {
        bucketName: 'images'
    }
    )

    let image = bucket.openDownloadStreamByName(id)
    return image
}