import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  error_pswd : boolean = false;
  constructor(
    private router: Router,
    private api:ApiHelperService
  ){}
  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const lastname: string = (document.getElementById('lastname') as HTMLInputElement).value;
    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    const age: number = +((document.getElementById('age') as HTMLInputElement).value);
    const password: string = (document.getElementById('new_pswd') as HTMLInputElement).value;
    const confirm_password: string = (document.getElementById('confirm_pswd') as HTMLInputElement).value;

    if(password == confirm_password){
      const newUser = {
        lastname: lastname,
        firstname: firstname,
        password: password,
        age:age
      };
  
      this.api.post({ endpoint: `/users`, data: newUser }).subscribe({ next : (response) => {
        console.log('Réponse reçue :',response);
        this.router.navigateByUrl('/login/registration')},
        error: (error) => {
          console.log("Erreur lors de l'inscription': ", error);
        }
      });
    }else{
      this.error_pswd = true;
    }
  }
  login(): void{
    this.router.navigateByUrl('/login');
  }
}
