import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiHelperService } from '../services/api-helper.service';

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
    private router: Router,
    private api:ApiHelperService
  ){
    this.id = this.service.getId();
  }
  ngOnInit(): void {
    this.api.get({endpoint: `/users/${this.id}`}).subscribe({ next : (response) => {
      console.log('Réponse reçue :', response.body);
      this.user = response.body} });
  }
  submit(): void {
    const name: string = (document.getElementById('name') as HTMLInputElement).value;
    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    const updatedUser = {
      "lastname": name,
      "firstname": firstname
    }
    this.api.put({ endpoint: `/users/${this.id}`, data: updatedUser }).subscribe()
    this.router.navigateByUrl('/profile')
    };
  
  cancel(): void {
    alert('the changes were not taken into account');
    this.router.navigateByUrl('/profile')
  }
}
