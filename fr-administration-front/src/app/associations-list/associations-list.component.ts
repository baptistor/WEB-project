import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from '../nav/nav.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchAssociationComponent } from "../search-association/search-association.component";
import { ApiHelperService } from '../services/api-helper.service';
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
    imports: [MatTableModule, NavComponent, CommonModule, RouterModule, SearchAssociationComponent],
    templateUrl: './associations-list.component.html',
    styleUrl: './associations-list.component.css'
  })
  export class AssociationsListComponent implements OnInit{
    id: number = 0;
    dataSource: any[] = [];
    displayedColumns: string[] = ['id','name', 'members'];
    constructor(private api:ApiHelperService,
      private route: ActivatedRoute,
      private router: Router) {}
      ngOnInit(): void {
        this.route.paramMap.subscribe(paramMap => {
          const idParam = paramMap.get('id');
          this.id = idParam ? +idParam : 0;
          this.loadData();
        });
      }
    
      loadData(): void {
        if (this.id === 0) {
          this.api.get({ endpoint: '/associations' }).subscribe({
            next: (response) => {
              this.dataSource = response.body;
              console.log(response.body);
            },
            error: (err) => {
              console.error(err);
            }
          });
        } else {
          this.api.get({ endpoint: `/associations/${this.id}` }).subscribe({
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

      createAssociation(): void{
        this.router.navigateByUrl('/create-association');
      }

  }
