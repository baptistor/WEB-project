import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { User } from '../users-list/users-list.component';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-association-item',
  imports: [NavComponent, CommonModule, RouterLink],
  templateUrl: './association-item.component.html',
  styleUrl: './association-item.component.css'
})
export class AssociationItemComponent {
  association: any; // Données de l'utilisateur
  minute : any;
  idUser : string;
  voters: User[]=[]
  userPresident: boolean =false;
  id: number =0;
  constructor(
    private service: TokenStorageService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiHelperService
  ) {
    this.idUser = this.service.getId();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

      this.loadAssociation(this.id);
      this.loadMinutes(this.id);
    });

  }

    loadAssociation(Id: number): void {
      const request: Observable<any> = this.http.get(`http://localhost:3000/associations/${Id}`, { observe: 'response' });
      request.subscribe({
        next: (response) => {
          console.log('Réponse reçue :', response.body);
          this.association = response.body;
          for (let i = 0; i<this.association.members.length; i++){
            if(this.association.members[i].id === +this.idUser && this.association.members[i].role==='Président'){
              this.userPresident=true;
            }
          }
          console.log('UserPrésident :'+ this.userPresident);

        },
        error: (err) => console.error('Erreur lors du chargement de l\'association:', err),
      });
    }

    loadMinutes(Id : number): void {
      const request: Observable<any> = this.http.get(`http://localhost:3000/associations/${Id}/minutes`, { observe: 'response' });
      request.subscribe({
        next: (response) => {
          console.log('Réponse reçue (minutes) :', response.body);
          this.minute = response.body;
          for (let i = 0; this.minute.idVoters.length; i++){
            this.api.get({ endpoint: `users/${this.minute.idVoters[i]}`}).subscribe({
            next: (response) => {
              this.voters.push(response.body);
            },
            error: (err) => {
              console.error(err);
            }
          });
          }
          
        },
        error: (err) => console.error('Erreur lors du chargement de l\'association:', err),
      });
    }

    delete() : void {
      this.router.navigateByUrl(`/delete-association/${this.id}`);
    }

    modifyAssociation() : void {
      this.router.navigateByUrl(`/associations/${this.id}/modify-association`);
    }

    createMinute() : void {
      this.router.navigateByUrl(`/associations/${this.id}/create-minute`);
    }

}
