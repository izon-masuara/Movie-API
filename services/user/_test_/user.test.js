import { app } from '../src/index'
import request from 'supertest'

describe('GET /users', () => {
    const user1 = {
        email : `test@mail.com`,
        password : `test1234`,
        status : `active`,
        expired : `2022-01-01`,
        role : `admin`,
    }

    it('response get all users', done => {
        request(app)
            .get('/users')
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(200)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done();
            })
            .catch(err => done(err))
    });
    it(`Success create user`, done => {
        request(app)
            .post(user1)
            .then(resp => {
                const { status,body } = resp
                expect(status).toBe(201)
                expect(body).toBe(`Email with name ${user1.email} created`)
                done();
            })
            .catch(err => done(err))
    })
});