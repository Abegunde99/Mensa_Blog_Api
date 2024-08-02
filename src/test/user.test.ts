import UserRepository from '../repository/user';
import User from '../models/user';
import ErrorResponse from '../utils/errorResponse';
import JwtUtility from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils';
import { IUserData } from '../interface';

jest.mock('../models/user');
jest.mock('../utils/jwt');
jest.mock('../utils', () => ({
    comparePassword: jest.fn(),
    hashPassword: jest.fn()
}));

const userRepo = new UserRepository();

describe('UserRepository', () => {
    describe('create', () => {
        it('should create a user', async () => {
            (User.create as jest.Mock).mockResolvedValue({ id: 1 });
            (userRepo.userResponseObject as jest.Mock) = jest.fn().mockResolvedValue({ id: 1, username: 'testUser' });

            const result = await userRepo.create({ username: 'testUser', email: 'test@example.com' });

            expect(result).toEqual({ id: 1, username: 'testUser' });
        });
    });

    describe('login', () => {
        it('should login a user with valid credentials', async () => {
            (userRepo.findByEmailOrUsername as jest.Mock) = jest.fn().mockResolvedValue({ id: 1, password: 'hashedPassword' });
            (comparePassword as jest.Mock).mockResolvedValue(true);
            (userRepo.userResponseObject as jest.Mock) = jest.fn().mockResolvedValue({ id: 1, username: 'testUser' });

            const result = await userRepo.login({ email: 'test@example.com', password: 'password' });

            expect(result).toEqual({ id: 1, username: 'testUser' });
        });

        it('should throw an error if credentials are invalid', async () => {
            (userRepo.findByEmailOrUsername as jest.Mock) = jest.fn().mockResolvedValue({ id: 1, password: 'hashedPassword' });
            (comparePassword as jest.Mock).mockResolvedValue(false);

            await expect(userRepo.login({ email: 'test@example.com', password: 'wrongPassword' }))
                .rejects.toThrow('Invalid credentials');
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            (User.findAll as jest.Mock).mockResolvedValue([{ id: 1, username: 'testUser' }]);

            const result = await userRepo.findAll();

            expect(result).toEqual([{ id: 1, username: 'testUser' }]);
        });
    });

    describe('findByEmailOrUsername', () => {
        it('should return a user by email or username', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: 1, username: 'testUser' });

            const result = await userRepo.findByEmailOrUsername('testUser');

            expect(result).toEqual({ id: 1, username: 'testUser' });
        });
    });

    describe('findById', () => {
        it('should return a user by id', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1, username: 'testUser' });

            const result = await userRepo.findById(1);

            expect(result).toEqual({ id: 1, username: 'testUser' });
        });

        it('should return null if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await userRepo.findById(1);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1, username: 'testUser' });
            (User.update as jest.Mock).mockResolvedValue([1]);
            (userRepo.userResponseObject as jest.Mock) = jest.fn().mockResolvedValue({ id: 1, username: 'updatedUser' });

            const result = await userRepo.update(1, { username: 'updatedUser' });

            expect(result).toEqual({ id: 1, username: 'updatedUser' });
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(userRepo.update(1, { username: 'updatedUser' })).rejects.toThrow('User not found');
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
            (User.destroy as jest.Mock).mockResolvedValue(1);

            const result = await userRepo.delete(1);

            expect(result).toEqual({ message: 'User successfully deleted' });
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(userRepo.delete(1)).rejects.toThrow('User not found');
        });
    });
});
