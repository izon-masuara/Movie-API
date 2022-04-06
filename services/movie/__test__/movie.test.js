import { app } from '../src/index'
import request from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

beforeAll(async() => {
    await mongoose.connect(process.env.URI)
    try {
        console.log('success')
    } catch (err) {
        console.log(err)
    }
})

afterAll(async() => {
    await mongoose.connection.db.collection(`movies`).drop()
    try {
        console.log('success')
    } catch (err) {
        console.log(err)
    }
})

const movie1 = {
    title : `Movie app`,
    image : 'movie.png',
    description : `this is me the king of mexico`,
    category : [`Horor`,`Comedy`],
    production : {
        year : `2002-02-22`,
        productionBy : `En film`
    }
}

describe(`GET /`, _ => {
    it(`Get all data movies`, done => {
        request(app)
            .get('/')
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(200)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done()
            })
    })

    it(`Create new data`, done => {
        request(app)
            .post('/')
            .send(movie1)
            .then(resp => {
                const { status,body } = resp
                expect(status).toBe(200)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done()
            })
    })
})