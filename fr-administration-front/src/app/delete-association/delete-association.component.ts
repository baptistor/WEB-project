import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-association',
  imports: [CommonModule],
  templateUrl: './delete-association.component.html',
  styleUrl: './delete-association.component.css'
})
export class DeleteAssociationComponent {
   error_pswd : boolean = false;
    idUser : string;
    idAsso: number = 0;
    constructor(
      private service : TokenStorageService,
      private router: Router,
      private api:ApiHelperService,
      private route: ActivatedRoute
    ){
      this.idUser = this.service.getId();

    }
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.idAsso = Number(params.get('id')); // ID de l'asso dans l url
      });
  
    }
    cancel(): void {
      this.router.navigateByUrl('/associations')
    }
    submit(event?: Event): void {
      if (event) {
        event.preventDefault();
      }
      const password = (document.getElementById('pswd') as HTMLInputElement).value;
  
      this.validate_pswd(this.idUser, password, (isValid) => {
        if (isValid) {
    
          this.api.delete({ endpoint: `/associations/${this.idAsso}`}).subscribe({ 
            next : (response) => {
            console.log('Réponse reçue :',response);
            this.router.navigateByUrl('/associations')
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
