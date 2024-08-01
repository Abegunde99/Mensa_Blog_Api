import User from '../models/User';

export default class UserRepository {
  async create(userData: Partial<User>): Promise<User> {
    return await User.create(userData);
  }

  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async update(id: number, userData: Partial<User>): Promise<[number, User[]]> {
    return await User.update(userData, { where: { id }, returning: true });
  }

  async delete(id: number): Promise<number> {
    return await User.destroy({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }
}