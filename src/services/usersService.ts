
import { apiClient } from './apiClient';
import { User } from '../types';
import { UpdateUserDto } from '../types/users';

class UsersService {
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/users/profile');
  }

  async updateProfile(data: UpdateUserDto): Promise<User> {
    return apiClient.put<User>('/users/profile', data);
  }
}

export const usersService = new UsersService();
