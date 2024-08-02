import request from 'supertest';
import app from '../app'; // Assuming your express app is exported from here
import Blog from '../models/blog';
import User from '../models/user';

jest.mock('../models/blog');
jest.mock('../models/user');

describe('Blog API', () => {
    describe('POST /posts', () => {
        it('should create a new blog', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
            (Blog.create as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Blog', content: 'Test Content', authorId: 1 });

            const res = await request(app).post('/blogs').send({ title: 'Test Blog', content: 'Test Content', authorId: 1 });

            expect(res.status).toBe(201);
            expect(res.body).toEqual({ id: 1, title: 'Test Blog', content: 'Test Content', authorId: 1 });
        });
    });

    describe('GET /posts', () => {
        it('should get all blogs', async () => {
            (Blog.findAll as jest.Mock).mockResolvedValue([{ id: 1, title: 'Test Blog' }]);

            const res = await request(app).get('/blogs');

            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1, title: 'Test Blog' }]);
        });
    });

    describe('GET /posts/:id', () => {
        it('should get a blog by id', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Blog' });

            const res = await request(app).get('/blogs/1');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, title: 'Test Blog' });
        });
    });

    describe('PUT /posts/:id', () => {
        it('should update a blog', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, title: 'Old Title', authorId: 1 });
            (Blog.update as jest.Mock).mockResolvedValue([1]);
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, title: 'New Title' });

            const res = await request(app).put('/blogs/1').send({ title: 'New Title', authorId: 1 });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, title: 'New Title' });
        });
    });

    describe('DELETE /posts/:id', () => {
        it('should delete a blog', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, authorId: 1 });
            (Blog.destroy as jest.Mock).mockResolvedValue(1);

            const res = await request(app).delete('/blogs/1').send({ authorId: 1 });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ message: 'Blog deleted Successfully' });
        });
    });

    describe('GET /posts/author/:authorId', () => {
        it('should get blogs by author id', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
            (Blog.findAll as jest.Mock).mockResolvedValue([{ id: 1, authorId: 1, title: 'Test Blog' }]);

            const res = await request(app).get('/blogs/author/1');

            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1, authorId: 1, title: 'Test Blog' }]);
        });
    });
});
