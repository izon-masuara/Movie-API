import { app } from '../src/index'
import request from 'supertest'

const user1 = {
    email: `kautsarmasuara@gmail.com`,
    password: `test1234`
}

const user2 = {
    email: `autsarmasuara@gmail.com`,
    password: `test1234`
}

const user3 = {
    email: `autsarmasuara@gmail.com`,
    password: `test14`
}

describe('GET /Login', () => {
    it('Login success', done => {
        request(app)
            .post('/login')
            .send(user1)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(200)
                expect(body).toHaveProperty(`access_token`)
                done();
            })
            .catch(err => done(err))
    });

    it(`Faild login beacause wrong email`, done => {
        request(app)
            .post('/login')
            .send(user2)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(400)
                expect(body).toBe(`Email or password are wrong`)
                done();
            })
            .catch(err => done(err))
    })

    it(`Faild login beacause wrong email`, done => {
        request(app)
            .post('/login')
            .send(user3)
            .then(resp => {
                const { status, body } = resp
                expect(status).toBe(400)
                expect(body).toBe(`Email or password are wrong`)
                done();
            })
            .catch(err => done(err))
    })
});