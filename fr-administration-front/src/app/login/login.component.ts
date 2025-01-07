import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authentificationDenied = false;
  isFromRegistration = false;
  constructor(
    private api: ApiHelperService,  
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void{
    this.isFromRegistration = this.route.snapshot.paramMap.get('from') == "registration" ? true : false;
  }
  login(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: '/auth/login', data: { username, password }}).subscribe({
      next: (response) => {
        console.log("Réponse reçue : ", response);
  
        if (response) {
          this.tokenStorageService.save(response.access_token, username);

          if(this.tokenStorageService.isLogged()){
            this.router.navigateByUrl('/users');
          }
          else{
            this.authentificationDenied=true;
          }
          
        } else {
          console.error("Réponse invalide");
        }
      }}
    )


  }
  registration(): void{
    this.router.navigateByUrl('/registration');
  }
}
