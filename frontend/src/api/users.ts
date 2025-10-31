import { API_ENDPOINT } from 'src/config';
import type { User } from 'src/types';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_ENDPOINT}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data.users;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_ENDPOINT}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const addUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const response = await fetch(`${API_ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  return response.json();
};

