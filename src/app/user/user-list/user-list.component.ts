import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  users: User[] = [];

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  editUser(user: User): void {
    // Redirige a la página de edición con el ID del usuario como parámetro en la URL
    this.router.navigate(['/edit', user.id]);
  }

  confirmDeleteUser(userId: number): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId); // Elimina el usuario si el usuario confirma
        Swal.fire('El Usuario se ha eliminado', '', 'success');
        this.users = this.userService.getUsers(); // Actualiza la lista de usuarios
      }
    });
  }

}
