import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NavComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
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
  modify() : void {
    this.router.navigateByUrl('/modify-profile');
  }
  delete() : void {
    this.router.navigateByUrl('/delete-user');
  }
}
