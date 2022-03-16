import { app } from '../src/index'
import request from 'supertest'

describe('GET /users', () => {
    it('response get all users', done => {
        request(app)
            .get('/users')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toEqual(
                    expect.arrayContaining(body)
                )
                done();
            })
            .catch(err => done(err))
    });
});