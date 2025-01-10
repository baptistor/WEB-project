import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../users-list/users-list.component';

@Component({
  selector: 'app-create-minute',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule, // Fournit un adaptateur de date pour MatDatepicker
    NavComponent,
  ],
  templateUrl: './create-minute.component.html',
  styleUrl: './create-minute.component.css'
})
export class CreateMinuteComponent {
    idUser: number;
    idAsso:number =0;
    availableUser : User[] = [];
    selectedUser : User[] =[];
    rolesSelectedUser: { [key: number]: string } = {};
    nameAsso: string='';
    content: string='';
    dateMinute: string='';
    isOk : Boolean =false;
    constructor(private api:ApiHelperService,
      private router: Router,
      private route: ActivatedRoute,
      private service : TokenStorageService
    ) {
      this.idUser=+this.service.getId();
    }
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.idAsso = Number(params.get('id'));
      this.loadMembers(this.idAsso);
      this.loadAsso(this.idAsso);
    });
    }

    loadMembers(idAsso: number): void{
      this.api.get({ endpoint: `/associations/${idAsso}/members`}).subscribe({
        next: (response) => {
          this.availableUser = response.body;
          this.isOk =true
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  loadAsso(idAsso: number): void{
    this.api.get({ endpoint: `/associations/${idAsso}`}).subscribe({
      next: (response) => {
        this.nameAsso = response.body.name;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onDateChange(event: any): void {
    const selectedDate = new Date(event.value); 
    const day = selectedDate.getDate().toString().padStart(2, '0'); 
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); 
    const year = selectedDate.getFullYear(); 
    this.dateMinute = `${day}/${month}/${year}`; 
  }

  create():void{

    let idVoters: number[] = [];

  
    for (let i = 0; i < this.selectedUser.length; i++) {
      idVoters.push(this.selectedUser[i].id);
    }
    console.log("idVoters: " + idVoters + " content : "+this.content+" ///date : " +this.dateMinute + " idAsso : "+this.idAsso)
    this.api.post({ endpoint: `/minutes`, data: { idVoters, content: this.content, date : this.dateMinute, idAssociation: this.idAsso } }).subscribe({
      next: (response) => {
        console.log('Réponse reçue :', response.body);
        this.router.navigateByUrl(`/associations/${this.idAsso}`);
      },
      error: (error) => {
        console.log("Erreur lors de l'inscription :", error);
      
      }
    });
  }

}
