import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-profile',
  imports: [CommonModule],
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.css'
})
export class ModifyProfileComponent {
  user : any;
  id : string;
  constructor(
    private service : TokenStorageService,
    private http: HttpClient,
    private router: Router
  ){
    this.id = this.service.getId();
  }
  ngOnInit(): void {
    const request: Observable<any> = this.http.get(`http://localhost:3000/users/${this.id}`, { observe: 'response' });
    request.subscribe({ next : (response) => {
      console.log('Réponse reçue :', response.body);
      this.user = response.body} });
  }
  submit(): void {
    const name: string = (document.getElementById('name') as HTMLInputElement).value;
    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    const age: number = +(document.getElementById('age') as HTMLInputElement).value;
    console.log(name);
    const updatedUser = {
      "name": name,
      "firstname": firstname,
      "age": age,
      "password": this.user.password
    }
    console.log(updatedUser);
    const request: Observable<any> = this.http.put<any>(`http://localhost:3000/users/${this.id}`,updatedUser, { observe: 'response' });
    request.subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour avec succès :', response);
        alert('successful update');
        this.router.navigateByUrl('/profile')
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour :', error);
        alert('Une erreur est survenue.');
      }
    });
  }

  cancel(): void {
    alert('the changes were not taken into account');
    this.router.navigateByUrl('/profile')
  }
}
