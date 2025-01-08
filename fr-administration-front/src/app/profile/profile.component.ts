import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { Observable, forkJoin } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NavComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any; // Données de l'utilisateur
  id: string; // ID de l'utilisateur connecté
  userOnHisProfile: boolean;
  Assoname: { [key: number]: string } = {}; // Tableau associatif pour les noms d'association

  constructor(
    private service: TokenStorageService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.service.getId(); // Récupérer l'ID de l'utilisateur connecté
    this.userOnHisProfile = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); // ID de l'utilisateur dans l'URL
      console.log("id: " + id);
      
      if (id === +this.id) {
        console.log("in id");
        this.router.navigateByUrl('/profile');
      } else if (this.router.url === '/profile') {
        this.userOnHisProfile = true;
        this.loadUser(+this.id);
      } else {
        this.loadUser(id);
      }
    });
  }

  loadUser(userId: number): void {
    const request: Observable<any> = this.http.get(`http://localhost:3000/users/${userId}`, { observe: 'response' });
    request.subscribe({
      next: (response) => {
        console.log('Réponse reçue :', response.body);
        this.user = response.body;
        this.loadAssociations();
      },
      error: (err) => console.error('Erreur lors du chargement de l\'utilisateur:', err),
    });
  }
  loadAssociations(): void {
    if (!this.user || !this.user.roles) return;
  
    const associationIds = this.user.roles.map((role: any) => role.idAssociation);
  
    const uniqueIds = [...new Set(associationIds)];
  
    // Requêtes parallèles pour récupérer les noms des associations
    const requests = uniqueIds.map(id => this.http.get<any>(`http://localhost:3000/associations/${id}`));
  
    forkJoin(requests).subscribe({ // execute toutes les requetes en même temps avant d'appeler la fonction next
      next: (responses) => {
        this.Assoname = [];
        let counter = 0; 
  
        responses.forEach((asso) => {
          this.Assoname[counter] = asso.name;  // Utilisation du compteur comme index
          counter++;  
        });
  
        console.log('Noms des associations chargés :', this.Assoname);
      },
      error: (err) => console.error('Erreur lors du chargement des associations:', err),
    });
  }
  

  modify(): void {
    this.router.navigateByUrl('/modify-profile');
  }
}
