import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  imports: [NavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user : any;
  id : string;
  constructor(
    private service : TokenStorageService,
    private http: HttpClient
  ){
    this.id = this.service.getId();
  }
  ngOnInit(): void {
    const request: Observable<any> = this.http.get(`http://localhost:3000/users/${this.id}`, { observe: 'response' });
    request.subscribe({ next : (response) => {
      console.log('Réponse reçue :', response.body);
      this.user = response.body} });
  }
}
