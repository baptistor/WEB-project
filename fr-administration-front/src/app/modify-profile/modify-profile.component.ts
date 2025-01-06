import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiHelperService } from '../services/api-helper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modify-profile',
  imports: [CommonModule],
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.css'
})
export class ModifyProfileComponent {
  user : any;
  id : string;
  error_pswd : boolean = false;
  constructor(
    private service : TokenStorageService,
    private router: Router,
    private api:ApiHelperService
  ){
    this.id = this.service.getId();
  }
  ngOnInit(): void {
    this.api.get({endpoint: `/users/${this.id}`}).subscribe({ next : (response) => {
      console.log('Réponse reçue :', response.body);
      this.user = response.body},
      error: (error) => {
        console.log("Erreur lors de la récupération des informations du profil : ", error);
      }
    });
  }
  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const old_password = (document.getElementById('pswd') as HTMLInputElement).value;

    this.validate_pswd(this.id, old_password, (isValid) => {
      if (isValid) {
        const name = (document.getElementById('lastname') as HTMLInputElement).value;
        const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
        const password = (document.getElementById('new_pswd') as HTMLInputElement).value;
        
        const updatedUser = {
          lastname: name,
          firstname: firstname,
          password: password,
        };
  
        this.api.put({ endpoint: `/users/${this.id}`, data: updatedUser }).subscribe({ next : (response) => {
          console.log('Réponse reçue :',response);
          this.router.navigateByUrl('/profile')},
          error: (error) => {
            console.log("Erreur lors de la mise à jour : ", error);
          }
        });
      } else {
        console.log("Erreur dans la validation du mot de passe");
        this.error_pswd = true;
      }
    });
  }
  
  
  cancel(): void {
    alert('the changes were not taken into account');
    this.router.navigateByUrl('/profile')
  }

  //callback pour éviter de retourner un boolean avant le retour de la requete
  validate_pswd(username: string, password: string, callback: (isValid: boolean) => void): void {
    this.api.post({ endpoint: '/auth/login', data: { username, password }}).subscribe({
      next: (response) => {
        console.log("Réponse reçue : ", response);
        callback(true); 
      },
      error: (error) => {
        console.log("Erreur lors de l'appel à l'auth : ", error);
        callback(false); 
      }
    });
  }  
}
