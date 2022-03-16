import { app } from '../src/index'
import request from 'supertest'

describe('GET /Login', () => {
    it('responds with json', done => {
        request(app)
            .get('/Login')
            .then(response => {
                expect(response.status).toBe(200)
                done();
            })
            .catch(err => done(err))
    });
});