import request from 'supertest';
import app from '../app'; // Assuming your express app is exported from here
import User from '../models/user';
import JwtUtility from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils';

jest.mock('../models/user');
jest.mock('../utils/jwt');
jest.mock('../utils', () => ({
    comparePassword: jest.fn(),
    hashPassword: jest.fn()
}));

describe('User API', () => {
    describe('POST /users/create', () => {
        it('should create a new user', async () => {
            (User.create as jest.Mock).mockResolvedValue({ id: 1 });
            (JwtUtility.generateToken as jest.Mock).mockReturnValue('fakeToken');

            const res = await request(app).post('/users').send({ username: 'testUser', email: 'test@example.com' });

            expect(res.status).toBe(201);
            expect(res.body).toEqual({ id: 1, username: 'testUser', email: 'test@example.com', accessToken: 'fakeToken' });
        });
    });

    describe('POST /users/login', () => {
        it('should login a user with valid credentials', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: 1, password: 'hashedPassword' });
            (comparePassword as jest.Mock).mockResolvedValue(true);
            (JwtUtility.generateToken as jest.Mock).mockReturnValue('fakeToken');

            const res = await request(app).post('/users/login').send({ email: 'test@example.com', password: 'password' });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, username: 'testUser', email: 'test@example.com', accessToken: 'fakeToken' });
        });

        it('should return 401 for invalid credentials', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: 1, password: 'hashedPassword' });
            (comparePassword as jest.Mock).mockResolvedValue(false);

            const res = await request(app).post('/users/login').send({ email: 'test@example.com', password: 'wrongPassword' });

            expect(res.status).toBe(401);
            expect(res.body).toEqual({ error: 'Invalid credentials' });
        });
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            (User.findAll as jest.Mock).mockResolvedValue([{ id: 1, username: 'testUser' }]);

            const res = await request(app).get('/users');

            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1, username: 'testUser' }]);
        });
    });

    describe('GET /users/:id', () => {
        it('should get a user by id', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1, username: 'testUser' });

            const res = await request(app).get('/users/1');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, username: 'testUser' });
        });

        it('should return 404 if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            const res = await request(app).get('/users/1');

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: 'User not found' });
        });
    });

    describe('PUT /users/:id', () => {
        it('should update a user', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1, username: 'testUser' });
            (User.update as jest.Mock).mockResolvedValue([1]);
            (JwtUtility.generateToken as jest.Mock).mockReturnValue('fakeToken');

            const res = await request(app).put('/users/1').send({ username: 'updatedUser' });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, username: 'updatedUser', email: 'test@example.com', accessToken: 'fakeToken' });
        });

        it('should return 404 if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            const res = await request(app).put('/users/1').send({ username: 'updatedUser' });

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: 'User not found' });
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
            (User.destroy as jest.Mock).mockResolvedValue(1);

            const res = await request(app).delete('/users/1');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ message: 'User successfully deleted' });
        });

        it('should return 404 if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            const res = await request(app).delete('/users/1');

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: 'User not found' });
        });
    });
});
