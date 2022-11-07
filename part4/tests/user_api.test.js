const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = require('../app');
const { initialUsers, usersInDb } = require('./api_helper');
const supertest = require('supertest');

const api = supertest(app);

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({
            ...initialUsers[0], passwordHash: await bcrypt.hash(initialUsers[0].password, 10)
        });
        await user.save();
    }, 10000);

    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        
    }, 10000);

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb();

        const newUser = initialUsers[1];
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    }, 10000);

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb();

        const newUser = initialUsers[0];

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('username must be unique');

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    }, 10000);

    test('creation fails with proper statuscode and message if username is too short', async () => {
        const usersAtStart = await usersInDb();

        const newUser = {
            username: 'ab',
            name: 'Abby',
            password: 'secret'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('username must be at least 3 characters');

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    }
    , 10000);

    describe('viewing a specific user', () => {
        test('succeeds with a valid id', async () => {
            const usersAtStart = await usersInDb();

            const userToView = usersAtStart[0];

            const resultUser = await api
                .get(`/api/users/${userToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            
            const processedUserToView = JSON.parse(JSON.stringify(userToView));
            expect(resultUser.body).toEqual(processedUserToView);
        }, 10000);


        test('fails with statuscode 400 id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445';

            await api
                .get(`/api/users/${invalidId}`)
                .expect(400);
        }, 10000);
    });
});

afterAll(() => {
    mongoose.connection.close();
});