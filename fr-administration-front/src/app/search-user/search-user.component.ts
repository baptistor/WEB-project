import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-search-user',
  imports: [CommonModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  error_id : boolean = false;
  constructor(
    private router: Router,
    private api:ApiHelperService
  ){}
  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const id = (document.getElementById('user-id') as HTMLInputElement).value;
    this.api.get({endpoint: `/users/${id}`}).subscribe({ next : (response) => {
      console.log('Réponse reçue :', response.body);
      if (response.body == null){
        this.error_id = true;
      }else{
        console.log(id);
        this.router.navigateByUrl(`/users/${id}`)
      }
    },
      error: (error) => {
        console.log("Erreur lors de la récupération du user : ", error);
      }
    });
  }
}
