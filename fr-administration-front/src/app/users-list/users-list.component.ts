import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom, Observable } from 'rxjs';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, NavComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})



export class UsersListComponent implements OnInit{
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    request.subscribe({ next : (response) => this.dataSource = response.body });
    
  }


  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];


  
}



