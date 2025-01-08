import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from "../nav/nav.component";
import {ActivatedRoute, RouterModule } from '@angular/router';
import { SearchUserComponent } from '../search-user/search-user.component';
import { ApiHelperService } from '../services/api-helper.service';

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  age: number;
}
@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, NavComponent, CommonModule, RouterModule,SearchUserComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  id: number = 0;
  dataSource : User[] = [];
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  constructor(private api:ApiHelperService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const idParam = paramMap.get('id');
      this.id = idParam ? +idParam : 0;
      this.loadData();
    });
  }

  loadData(): void {
    if (this.id === 0) {
      this.api.get({ endpoint: '/users' }).subscribe({
        next: (response) => {
          this.dataSource = response.body;
          console.log(response.body);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.api.get({ endpoint: `/users/${this.id}` }).subscribe({
        next: (response) => {
          this.dataSource = [response.body];
          console.log(response.body);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}



