import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
export interface Member {
  name: string;
  role: string;
}

export interface Association {
  id: number;
  name: string;
  members: Member[];
}
  @Component({
    selector: 'app-associations-list',
    imports: [MatTableModule, NavComponent, CommonModule, RouterModule,ReactiveFormsModule ],
    templateUrl: './associations-list.component.html',
    styleUrl: './associations-list.component.css'
  })
  export class AssociationsListComponent implements OnInit{
    id: number = 0;
    error_id : boolean = false;
    displayedColumns: string[] = ['id','name', 'members'];
    dataSource : Association[] = [];
    allAssociations : Association[] = [];
    associationsGroup = new FormGroup({
      controlAssociations: new FormControl(),
    })
    constructor(private api:ApiHelperService) {}
    ngOnInit(): void {
      this.loadData();
      this.associationsGroup.get('controlAssociations')?.valueChanges.subscribe(
        value => {
          this.id = value ? +value : 0;
          this.filterData();
        }
      )
    }
    loadData(): void {
      this.api.get({ endpoint: '/associations' }).subscribe({
        next: (response) => {
          this.dataSource = response.body;
          this.allAssociations = this.dataSource;
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
        this.dataSource = this.allAssociations.filter(asso => asso.id.toString().startsWith(idString))
      }else {
        this.dataSource = this.allAssociations
      }
    }

  }
