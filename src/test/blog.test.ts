import BlogRepository from '../repository/blog';
import Blog from '../models/blog';
import User from '../models/user';
import ErrorResponse from '../utils/errorResponse';

jest.mock('../models/blog');
jest.mock('../models/user');

const blogRepo = new BlogRepository();

describe('BlogRepository', () => {
    describe('create', () => {
        it('should create a blog', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
            (Blog.create as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Blog', content: 'Test Content', authorId: 1 });

            const result = await blogRepo.create({ title: 'Test Blog', content: 'Test Content', authorId: 1 });

            expect(result).toEqual({ id: 1, title: 'Test Blog', content: 'Test Content', authorId: 1 });
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(blogRepo.create({ title: 'Test Blog', content: 'Test Content', authorId: 1 }))
                .rejects.toThrow('User not found');
        });
    });

    describe('findAll', () => {
        it('should return all blogs', async () => {
            (Blog.findAll as jest.Mock).mockResolvedValue([{ id: 1, title: 'Test Blog' }]);

            const result = await blogRepo.findAll();

            expect(result).toEqual([{ id: 1, title: 'Test Blog' }]);
        });
    });

    describe('findById', () => {
        it('should return a blog by id', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Blog' });

            const result = await blogRepo.findById(1);

            expect(result).toEqual({ id: 1, title: 'Test Blog' });
        });

        it('should return null if blog not found', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await blogRepo.findById(1);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a blog', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, title: 'Old Title', authorId: 1 });
            (Blog.update as jest.Mock).mockResolvedValue([1]);
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, title: 'New Title' });

            const result = await blogRepo.update(1, 1, { title: 'New Title' });

            expect(result).toEqual({ id: 1, title: 'New Title' });
        });

        it('should throw an error if blog not found', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(blogRepo.update(1, 1, { title: 'New Title' })).rejects.toThrow('Blog not found');
        });
    });

    describe('delete', () => {
        it('should delete a blog', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue({ id: 1, authorId: 1 });
            (Blog.destroy as jest.Mock).mockResolvedValue(1);

            const result = await blogRepo.delete(1, 1);

            expect(result).toEqual({ message: 'Blog deleted Successfully' });
        });

        it('should throw an error if blog not found', async () => {
            (Blog.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(blogRepo.delete(1, 1)).rejects.toThrow('Blog not found');
        });
    });

    describe('findByAuthor', () => {
        it('should return blogs by author id', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
            (Blog.findAll as jest.Mock).mockResolvedValue([{ id: 1, authorId: 1, title: 'Test Blog' }]);

            const result = await blogRepo.findByAuthor(1);

            expect(result).toEqual([{ id: 1, authorId: 1, title: 'Test Blog' }]);
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(blogRepo.findByAuthor(1)).rejects.toThrow('User not found');
        });
    });
});
