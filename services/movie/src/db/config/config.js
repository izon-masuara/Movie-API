import mongosee from 'mongoose'

const connect = async () => {
    return await mongosee.connect(process.env.URI)
}

export default connect