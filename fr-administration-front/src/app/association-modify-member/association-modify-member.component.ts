import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../users-list/users-list.component';
import { Association } from '../associations-list/associations-list.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-association-modify-member',
  imports: [ NavComponent, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatOptionModule, FormsModule],
  templateUrl: './association-modify-member.component.html',
  styleUrl: './association-modify-member.component.css'
})
export class AssociationModifyMemberComponent {
    idUser: number;
    idAsso:number =0;
    assoInfo: any;
    allUser:User[] = [];
    availableUser : User[] = [];
    selectedUser : User[] =[];
    rolesSelectedUser: { [key: number]: string } = {};
    name: string='';
    isOk : Boolean =false;
    constructor(private api:ApiHelperService,
      private router: Router,
      private route: ActivatedRoute,
      private service : TokenStorageService
    ) {
      this.idUser=+this.service.getId();
    }
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.idAsso = Number(params.get('id'));
      this.loadAsso(this.idAsso);
    });
    }

    loadAsso(idAsso: number): void {
      this.api.get({ endpoint: `/associations/${idAsso}` }).subscribe({
        next: (response) => {
          this.assoInfo = response.body;
          this.name = this.assoInfo.name
          this.api.get({ endpoint: '/users' }).subscribe({
            next: (response) => {
              this.availableUser = response.body;
    
              // Remplir selectedUser avec les utilisateurs de availableUser par référence
              this.selectedUser = this.assoInfo.members.map((member : any) =>
                this.availableUser.find(user => user.id === member.id)
              ).filter((user: any) => user !== undefined);
    
              // Remplir les rôles
              this.assoInfo.members.forEach((member : any) => {
                this.rolesSelectedUser[member.id] = member.role;
              });
            },
            error: (err) => {
              console.error(err);
            }
          });
          this.isOk = true;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    

    modify(): void{
      let idUsers: number[] = [];
      idUsers.push(this.idUser);
      let roles: string[] = [];
      roles.push("Président");
    
      for (let i = 0; i < this.selectedUser.length; i++) {
        if(this.selectedUser[i].id !== this.idUser){
          idUsers.push(this.selectedUser[i].id);
          roles.push(this.rolesSelectedUser[this.selectedUser[i].id]);
        }

      }
      let name = this.name;
      console.log("name : " + name + " idUsers : " + idUsers + " Roles : " + roles);
      this.api.put({ endpoint: `/associations/${+this.idAsso}`, data: { idUsers, name } }).subscribe({
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
