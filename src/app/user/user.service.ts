import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = []

  constructor() {
    // Simulamos la inicialización de usuarios
    this.users = [
      {
        id: 1,
        nombre: 'Andres',
        apellidos: 'Moreno',
        email: 'Andres@example.com',
        tipoUsuario: 'Admin',
        fechaCreacion: '2003-12-05',
        observaciones: 'Admin principal'
      },

      {
        id: 2,
        nombre: 'Juan',
        apellidos: 'Pérez',
        email: 'juan@example.com',
        tipoUsuario: 'vendedor',
        fechaCreacion: '2023-10-25',
        observaciones: 'vendedor principal'
      },

      {
        id: 3,
        nombre: 'Aleja',
        apellidos: 'Pardo',
        email: 'Aleja@example.com',
        tipoUsuario: 'cliente',
        fechaCreacion: '2023-10-25',
        observaciones: 'cliente principal'
      },

    ];
  }

  getUsers(): User[] {
    localStorage.setItem('users', JSON.stringify(this.users))
    return this.users;
  }

  getUserById(userId: number): User | undefined{
    return this.users.find(user => user.id === userId);
  }

  addUser(user: User): void {
    user.id = this.users.length + 1; // Simulamos la generación de un ID único
    this.users.push(user);
  }

  updateUser(updatedUser: User): void {
    console.log(updatedUser)
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      console.log(index)
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }




}
