import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IData } from '../IData';
import { DATA } from '../mock-data';



@Injectable({
  providedIn: 'root'
})
export class DataMockService {

  constructor() { }
  getAll(): Observable<IData[]>{
      return of(DATA);
  }

  getMonsters(): Observable<IData[]> {
    return of(DATA).pipe(
      map(data => data.filter(item => item.category === 'monster'))
    );
  }

  getCreatures(): Observable<IData[]> {
    return of(DATA).pipe(
      map(data => data.filter(item => item.category === 'creature'))
    );
  }

  getItemById(id: number): Observable<IData> {
    const item = DATA.find(data => data.id === id);
  
    if (item) {
      return of(item);
    } else {
      throw new Error(`Item with ID ${id} not found`);
    }
  }
  
}

