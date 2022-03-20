import { app } from '../src/index'
import request from 'supertest'
import db from '../src/db/config/connection'
import migrate from '../src/db/migration/migrate'

beforeAll(done => {
    migrate()
    done()
})

afterAll(done => {
    try {
        db.query(`DROP TABLE IF EXISTS login_users;`)
        db.query(`DROP TABLE IF EXISTS users;`)
    } catch (err) {
        console.log(err)
    }
    done()
})

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
            .post('/users')
            .send(user1)
            .then(resp => {
                const { status,body } = resp
                expect(status).toBe(201)
                console.log(body)
                expect(body).toBe(`Email with name ${user1.email} created`)
                done();
            })
            .catch(err => done(err))
    })
});