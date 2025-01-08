import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-association',
  imports: [CommonModule],
  templateUrl: './search-association.component.html',
  styleUrl: './search-association.component.css'
})
export class SearchAssociationComponent {
  error_id : boolean = false;
  constructor(
    private router: Router,
    private api:ApiHelperService
  ){}
  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const id = (document.getElementById('association-id') as HTMLInputElement).value;
    this.api.get({endpoint: `/associations/${id}`}).subscribe({ next : (response) => {
      console.log('Réponse reçue :', response.body);
      if (response.body == null){
        this.error_id = true;
      }else{
        console.log(id);
        this.router.navigateByUrl(`/associations/list/${id}`)
      }
    },
      error: (error) => {
        this.error_id = true;
        console.log("Erreur lors de la récupération de l'association : ", error);
      }
    });
  }
}
