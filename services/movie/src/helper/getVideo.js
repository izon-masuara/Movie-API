import mongoose from "mongoose"

export const getVideo = async (id) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db, {
        bucketName: 'videos'
    }
    )

    let video = bucket.openDownloadStreamByName(id)
    return video
}