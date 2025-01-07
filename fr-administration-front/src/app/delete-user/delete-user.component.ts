import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  imports: [CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  error_pswd : boolean = false;
  id : string;
  constructor(
    private service : TokenStorageService,
    private router: Router,
    private api:ApiHelperService,
    private route: ActivatedRoute
  ){
    this.id = this.service.getId();
  }
  cancel(): void {
    this.router.navigateByUrl('/profile')
  }
  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const password = (document.getElementById('pswd') as HTMLInputElement).value;

    this.validate_pswd(this.id, password, (isValid) => {
      if (isValid) {
  
        this.api.delete({ endpoint: `/users/${this.id}`}).subscribe({ 
          next : (response) => {
          console.log('Réponse reçue :',response);
          this.service.clear();
          this.router.navigateByUrl('/login')
          alert('account deleted !')},
          error: (error) => {
            console.log("Erreur lors de la suppression : ", error);
          }
        });
      } else {
        console.log("Erreur dans la validation du mot de passe");
        this.error_pswd = true;
      }
    });
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
