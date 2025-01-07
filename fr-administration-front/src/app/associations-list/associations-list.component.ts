  import { Component, OnInit } from '@angular/core';
  import { MatTableModule } from '@angular/material/table';
  import { NavComponent } from '../nav/nav.component';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Component({
    selector: 'app-associations-list',
    imports: [MatTableModule, NavComponent],
    templateUrl: './associations-list.component.html',
    styleUrl: './associations-list.component.css'
  })
  export class AssociationsListComponent implements OnInit{
    dataSource: any[] = [];
    displayedColumns: string[] = ['name', 'members'];
    constructor(private http: HttpClient) {}
    ngOnInit(): void {
      const request: Observable<any> = this.http.get('http://localhost:3000/associations', { observe: 'response' });
      request.subscribe({ next : (response) => this.dataSource = response.body });


      let displayedColumns = ['name', 'membre'];
      this.dataSource = [];

    
    }

  }
