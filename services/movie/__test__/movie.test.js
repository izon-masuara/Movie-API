import { app } from '../src/index'
import request from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

beforeAll(async () => {
    await mongoose.connect(process.env.URI)
})

describe(`GET /`, _ => {
    it(`Get all data movies`, done => {
        request(app)
            .get('/')
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