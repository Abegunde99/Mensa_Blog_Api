import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import { ExtendedError, IUserData, IUser } from '../interface';
import { Op } from 'sequelize';
import JwtUtility from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils';
import { Console } from 'console';

export default class UserRepository {
  async create(userData: Partial<User>): Promise<IUserData | undefined> {
    try {
      const user = await User.create(userData);
      return this.userResponseObject(user.id);
    } catch (error: any) {
      throw new ErrorResponse(error.message, 500)
    } 
  }

  async login(userData: Partial<User>): Promise<IUserData | undefined>{
      const emailOrUsername = userData.email || userData.username;
      if (!emailOrUsername) {
        throw new ErrorResponse("Email or username must be provided", 400);
      }
      const user = await this.findByEmailOrUsername(emailOrUsername);
      if (!user) {
        throw new ErrorResponse("User not found", 404);
      }
    const isPasswordValid = await comparePassword(user.password, userData.password || '');
      if (!isPasswordValid) {
        throw new ErrorResponse("Invalid credentials", 401);
      }
      return this.userResponseObject(user.id);
  }

  async userResponseObject(id: number): Promise<IUserData | undefined> {
    const user = await this.findById(id);
    if (user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken: JwtUtility.generateToken(user.id),
        };
    }
}

  async findAll(): Promise<User[]> {
    return await User.findAll({
      attributes: { exclude: ['password'] }
    });
  }

  async findByEmailOrUsername(userData: string | undefined): Promise<User | null> {
  return await User.findOne({
    where: {
      [Op.or]: [
        { email: userData },
        { username: userData }
      ]
    }
  });
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id, { attributes: { exclude: ['password'] }});
  }

  async update(id: number, userData: Partial<User>): Promise<IUserData | undefined | { updatedUser: number }> {
    const user = await User.findByPk(id);
    if (!user) throw new ErrorResponse('User not found', 404);
  
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
  
    const [affectedCount, updatedUsers] = await User.update(userData, { where: { id }, returning: true });
  
    if (affectedCount === 0) {
      throw new ErrorResponse('Please enter the right field to update', 400);
    }
  
    if (userData.password) {
      return this.userResponseObject(user.id) ;
    }

    const returnedUser: IUserData = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    return returnedUser;
  }

  async delete(id: number): Promise<{ message: string }> {
    const user = await User.findByPk(id);
    if(!user) throw new ErrorResponse("User not found", 404)
    await User.destroy({ where: { id } });
    
    return { message: 'User successfully deleted' };
  }
}