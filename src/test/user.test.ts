import UserRepository from '../repository/user';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import JwtUtility from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils';

// Mocking dependencies
jest.mock('../models/User');
jest.mock('../utils/jwt');
jest.mock('../utils', () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn(),
}));

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return user data', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      (JwtUtility.generateToken as jest.Mock).mockReturnValue('mockedToken');

      const result = await userRepository.create({ username: 'testuser', email: 'test@example.com', password: 'password' });

      expect(User.create).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', password: 'password' });
      expect(result).toEqual({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        accessToken: 'mockedToken',
        createdAt: undefined,
        updatedAt: undefined,
      });
    });

    it('should throw an error if creation fails', async () => {
      (User.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userRepository.create({ username: 'testuser', email: 'test@example.com', password: 'password' }))
        .rejects.toThrow(ErrorResponse);
    });
  });

  describe('login', () => {
    it('should login a user and return user data', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedPassword' };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(true);
      (JwtUtility.generateToken as jest.Mock).mockReturnValue('mockedToken');

      const result = await userRepository.login({ email: 'test@example.com', password: 'password' });

      expect(result).toEqual({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        accessToken: 'mockedToken',
        createdAt: undefined,
        updatedAt: undefined,
      });
    });

    it('should throw an error if user is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(userRepository.login({ email: 'test@example.com', password: 'password' }))
        .rejects.toThrow('User not found');
    });

    it('should throw an error if password is invalid', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedPassword' };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(userRepository.login({ email: 'test@example.com', password: 'wrongpassword' }))
        .rejects.toThrow('Invalid credentials');
    });
  });

});