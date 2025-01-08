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
  constructor(
    private service: TokenStorageService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); // ID de l'utilisateur dans l'URL
      console.log("id: " + id);
      
      this.loadAssociation(id);
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
}
