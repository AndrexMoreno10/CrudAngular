import { Component, OnInit ,Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{

  @Input() editedUser: User = {
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    tipoUsuario: '',
    fechaCreacion: '',
    observaciones: ''
  };
  

  constructor(private userService: UserService,private router: Router,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    // Recupera el ID del usuario de la URL y obtén los datos del usuario
    const  userId : string | null = this.route.snapshot.paramMap.get('id');

    if(userId){
      const userEncontrado = this.userService.getUserById(parseInt(userId));
      if(userEncontrado){
        this.editedUser.id = userEncontrado.id
        this.editedUser.nombre = userEncontrado.nombre,
        this.editedUser.apellidos = userEncontrado.apellidos,
        this.editedUser.email = userEncontrado.email,
        this.editedUser.tipoUsuario = userEncontrado.tipoUsuario,
        this.editedUser.fechaCreacion = userEncontrado.fechaCreacion,
        this.editedUser.observaciones = userEncontrado.observaciones
      }
    }


    }


  saveUser(): void {
    this.userService.updateUser(this.editedUser);
    localStorage.setItem('editedUser', JSON.stringify(this.editedUser));
    this.router.navigate(['/']);
  }

}
