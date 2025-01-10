import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { User } from '../users-list/users-list.component';
import { TokenStorageService } from '../services/token-storage.service';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-create-association',
  imports: [ NavComponent, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatOptionModule, FormsModule],
  templateUrl: './create-association.component.html',
  styleUrl: './create-association.component.css'
})
export class CreateAssociationComponent {
  idUser: number;
  availableUser : User[] = [];
  selectedUser : User[] =[];
  rolesSelectedUser: { [key: number]: string } = {};
  name: string='';
  isOk : Boolean =false;
  constructor(private api:ApiHelperService,
    private router: Router,
    private service : TokenStorageService
  ) {
    this.idUser=+this.service.getId();
  }
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void{
      this.api.get({ endpoint: '/users' }).subscribe({
        next: (response) => {
          this.availableUser = response.body;
          console.log(this.availableUser)
          let i=0
          while(i<this.availableUser.length){
            if(this.availableUser[i].id === this.idUser){
              break;
            }
            else{
              i++
            }
          }
          this.availableUser.splice(i,1)
          console.log(this.availableUser);
          this.isOk =true
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  create(): void {
    let idUsers: number[] = [];
    idUsers.push(this.idUser);
    let roles: string[] = [];
    roles.push("Président");
  
    for (let i = 0; i < this.selectedUser.length; i++) {
      idUsers.push(this.selectedUser[i].id);
      roles.push(this.rolesSelectedUser[this.selectedUser[i].id]);
    }
    let name = this.name;
    console.log("name : " + name + " idUsers : " + idUsers + " Roles : " + roles);
    this.api.post({ endpoint: `/associations`, data: { idUsers, name } }).subscribe({
      next: (response) => {
        console.log('Réponse reçue :', response.body.id);
        const idAsso = response.body.id;
  
        const updateRequests = idUsers.map((userId, index) => 
          this.api.put({endpoint: `/roles/${userId}/${idAsso}`,data: { name: roles[index] }})
      );
  
        forkJoin(updateRequests).subscribe({ //Attends que toutes les requêtes PUT soient correctement effectués 
          next: (responses) => {
            console.log('Tous les rôles ont été mis à jour :', responses);
            this.router.navigateByUrl(`/associations/${idAsso}`); //Ensuite on redirige ce qui permet d'être sûr que les utilisateurs aient bien été mis a jour
          },
          error: (error) => {
            console.log('Une erreur est survenue lors de la mise à jour des rôles :', error);
          }
        });
      },
      error: (error) => {
        console.log("Erreur lors de l'inscription :", error);
      }
    });
  }
}
