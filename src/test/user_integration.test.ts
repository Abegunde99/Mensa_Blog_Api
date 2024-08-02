import request from 'supertest';
import app from '../app';
import User from '../models/User';

describe('User API', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toBe('testuser');
      expect(res.body.email).toBe('test@example.com');
      expect(res.body).toHaveProperty('accessToken');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          username: 'testuser',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/users')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });
    });

    it('should login a user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/users', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/users')
        .send({
          username: 'testuser1',
          email: 'test1@example.com',
          password: 'password123',
        });
      await request(app)
        .post('/api/users')
        .send({
          username: 'testuser2',
          email: 'test2@example.com',
          password: 'password123',
        });
    });

    it('should return all users', async () => {
      const res = await request(app).get('/api/users');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('username');
      expect(res.body[0]).toHaveProperty('email');
      expect(res.body[0]).not.toHaveProperty('password');
    });
  });

});