import { Component, Input, OnInit } from '@angular/core';
import { DataMockService } from '../data-mock.service';
import { IData } from '../../IData';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  @Input() dataList: IData[] = [];


  constructor(
      private dataMockService: DataMockService,
      private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.route.url.subscribe(res => {
      console.log('URL segments:', res);
      if (res.some(segment => segment.path === 'monsters')){
        this.getMonsters();
      }
      else if (res.some(segment => segment.path === 'creatures')){
        this.getCreatures();
      }
      // else{
      //   this.getAll()
      // }  
    });
  }



  getAll(): void{
    this.dataMockService.getAll()
      .subscribe({
        next: (data) => this.dataList = data,
        error: (e) => console.error(e),
        complete: () => console.info('end load all data')
      });
}

getMonsters(): void{
    this.dataMockService.getMonsters()
      .subscribe({
        next: (data) => this.dataList = data,
        error: (e) => console.error(e),
        complete: () => console.info('end load all data')
      });
}

getCreatures(): void{
  this.dataMockService.getCreatures()
    .subscribe({
      next: (data) => this.dataList = data,
      error: (e) => console.error(e),
      complete: () => console.info('end load all data')
    });
}


}
