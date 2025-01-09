import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from "../nav/nav.component";
import {RouterModule } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  age: number;
}
@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, NavComponent, CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  error_id : boolean = false;
  id: number = 0;
  dataSource : User[] = [];
  allUsers : User[] = [];
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  usersGroup = new FormGroup({
    controlUsers: new FormControl(),
  })
  constructor(private api:ApiHelperService) {}
  ngOnInit(): void {
    this.loadData();
    this.usersGroup.get('controlUsers')?.valueChanges.subscribe(
      value => {
        this.id = value ? +value : 0;
        this.filterData();
      }
    )
  }
  loadData(): void {
    this.api.get({ endpoint: '/users' }).subscribe({
      next: (response) => {
        this.dataSource = response.body;
        this.allUsers = this.dataSource;
        console.log(response.body);
        this.filterData();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  filterData(): void{
    if(this.id != 0){
      const idString = this.id.toString();
      console.log(this.id)
      this.dataSource = this.allUsers.filter(user => user.id.toString().startsWith(idString))
    }else {
      this.dataSource = this.allUsers
    }
  }
}



