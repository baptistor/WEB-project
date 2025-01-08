import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-association-item',
  imports: [NavComponent, CommonModule],
  templateUrl: './association-item.component.html',
  styleUrl: './association-item.component.css'
})
export class AssociationItemComponent {
  association: any; // Données de l'utilisateur
  minute : any; 
  constructor(
    private service: TokenStorageService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); // ID de l'asso dans l url
      console.log("id: " + id);
      
      this.loadAssociation(id);
      this.loadMinutes(id);
    });
  }


    loadAssociation(Id: number): void {
      const request: Observable<any> = this.http.get(`http://localhost:3000/associations/${Id}`, { observe: 'response' });
      request.subscribe({
        next: (response) => {
          console.log('Réponse reçue :', response.body);
          this.association = response.body;
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
          
        },
        error: (err) => console.error('Erreur lors du chargement de l\'association:', err),
      });
    }
}
