
import { apiClient } from './http/apiClient';
import { User, UpdateUserDto } from '../types';

class UsersService {
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/users/me');
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    return apiClient.patch<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  }
}

export const usersService = new UsersService();
