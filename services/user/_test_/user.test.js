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

const user1 = {
    email: `kautsarmasuara@gmail.com`,
    password: `test1234`,
    status: `inactive`,
    expired: new Date().toISOString().slice(0,10),
    role: `admin`,
}

const user2 = {
    email: `kautsarmasuara@gmail.com`,
    password: `test1234`,
    status: `inactive`,
    expired: new Date().toISOString().slice(0,10),
    role: `admin`,
}

const user3 = {
    email: `testmailcom`,
    password: `test1234`,
    status: `inactive`,
    expired: new Date().toISOString().slice(0,10),
    role: `admin`,
}

const user4 = {
    email: `test1@mail.com`,
    password: `test1234`,
    status: `asdative`,
    expired: new Date().toISOString().slice(0,10),
    role: `admin`,
}

describe('POST Create /users', () => {

    it(`Success create user`, done => {
        request(app)
            .post('/users')
            .send(user1)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(201)
                expect(body).toBe(`Email with name ${user1.email} created`)
                done();
            })
            .catch(err => done(err))
    })

    it(`Do not create new user because duplicate Email`, done => {
        request(app)
            .post('/users')
            .send(user2)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(400)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done()
            })
            .catch(err => done(err))
    })

    it(`Do not create new user because error validation`, done => {
        request(app)
            .post('/users')
            .send(user3)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(400)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done()
            })
            .catch(err => done(err))
    })

    it(`Do not create new user because error validation`, done => {
        request(app)
            .post('/users')
            .send(user4)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(400)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done()
            })
            .catch(err => done(err))
    })
});

describe('GET /users', () => {
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
})

describe(`PATCH /users`, () => {
    it(`success patch status user`, done => {
        request(app)
            .patch('/users/1')
            .send({status : `active`})
            .then(resp => {
                const { status,body } = resp
                expect(status).toBe(200)
                expect(body).toBe(`Email ${user1.email} success updated with status active`)
                done()
            })
    })

    it(`Data which want to update not found`, done => {
        request(app)
            .patch('/users/2')
            .send({status : `inactive`})
            .then(resp => {
                const { status,body } = resp
                expect(status).toBe(404)
                expect(body).toBe('Data not found')
                done()
            })
    })
})

describe(`Delete /users`, () => {
    it(`Delete User`, done => {
        request(app)
            .delete('/users/1')
            .then(resp => {
                const { status,body } = resp
                expect(status).toBe(200)
                expect(body).toBe(`User with email ${user1.email} has been deleted`)
                done()
            })
    })
})