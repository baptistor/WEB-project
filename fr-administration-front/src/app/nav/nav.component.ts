import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isLogged : boolean;
  constructor(private service : TokenStorageService,
    private router: Router){
    this.isLogged = this.service.isLogged();
  }

  logout(): void {
    console.log("click on logout !");
    this.service.clear();
    this.router.navigateByUrl("/login");
  }
  profile(): void {
    this.router.navigateByUrl('/profile');
  }
}
