const request = require('supertest');
const { create } = require('./server');

describe('root', () => {

    it('request root, returns html', async () => {

        const app = await create();

        return request(app)
            .get('/')
            .expect(200)
            .then((res) => {
                expect(res.text).toContain('Welcome to Express');
            });
    });
    it('request api, returns json', async () => {

        const app = await create();

        return request(app)
            .get('/api/hello')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({ hello: 'goodbye' });
            });
    });    
    it('request invalid path, returns 404', async () => {

        const app = await create();
        const invalidPath = '/invalid-path';
        const invalidPathError = `Cannot GET ${invalidPath}`;

        return request(app)
            .get(invalidPath)
            .expect(404)
            .then((res) => {
                expect(res.text).toContain(invalidPathError);
            });
    });
});
