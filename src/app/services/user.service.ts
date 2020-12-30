import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  users: User[] = [
    {
      firstName: 'Jonny',
      lastName: 'Lutz',
      email: 'Jonny@gmail.com',
      password: '123456',
    },
    {
      firstName: 'Justin',
      lastName: 'Lutz',
      email: 'Justin@gmail.com',
      password: '123456',
    },
    {
      firstName: 'Linda',
      lastName: 'Lutz',
      email: 'Linda@gmail.com',
      password: '123456',
    },
    {
      firstName: 'Jim',
      lastName: 'Lutz',
      email: 'Jim@gmail.com',
      password: '123456',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUser(email) {
    return this.users.find((u) => u.email === email);
  }

  login(email, password) {
    const found = this.users.some((el) => el.email === email);
    if (!found) {
      return { error: 'This user does not exist' };
    } else if (
      this.users.some((el) => el.email === email && el.password !== password)
    ) {
      return {
        error: 'Invalid Credentials',
      };
    } else if (
      this.users.some((el) => el.email === email && el.password === password)
    ) {
      return {
        message: 'Login Success',
      };
    }
  }
}
