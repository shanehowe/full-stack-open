const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = require('../app');
const { initialUsers, usersInDb } = require('./api_helper');
const supertest = require('supertest');

const api = supertest(app);

describe('When there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({
            ...initialUsers[0], passwordHash: await bcrypt.hash(initialUsers[0].password, 10)
        });
        await user.save();
    }, 10000);

    describe('making a post request with valid details', () => {
        test('backend responds with status code 200', async () => {

            const userToSend = {
                username: initialUsers[0].username,
                password: initialUsers[0].password
            }

            await api
                .post('/api/login')
                .send(userToSend)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        test('backend responds with a signed token for user', async () => {
            const userToSend = {
                username: initialUsers[0].username,
                password: initialUsers[0].password
            }

            const signedUser = await api
                .post('/api/login')
                .send(userToSend)
                .expect(200)

            expect(signedUser.body.token).toBeDefined();
            expect(signedUser.body.username).toBe(userToSend.username);
        });
    });

    describe('making a post request with invalid details', () => {
        test('backend responds with a 401 unauthorized and appropriate error', async () => {
            const userToSend = {
                username: initialUsers[0].username,
                password: "wrong"
            }

            const result = await api
                .post('/api/login')
                .send(userToSend)
                .expect(401);
            
            expect(result.body.error).toContain('invalid username or password');
        });
    });
});

afterAll(() => {
    mongoose.connection.close();
});