import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule} from '@angular/material/select'
import { CommonModule } from '@angular/common';
import { IData } from '../../IData';
import { DATA } from '../../mock-data';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatSlideToggleModule, MatSelectModule, CommonModule, ListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  checkedMonsters: Boolean =true;
  checkedCreaturesFood: Boolean =false;
  checkedCreaturesNoFood: Boolean =true;
  monstersGroup!: FormGroup;
  searchGroup!: FormGroup;
  listEffects: string[] = ["defense up", "speed up", 'attack up'];
  filteredEffects: string[] = [];
  private listData: IData[] = DATA;
  filteredData: IData[] = [];



  constructor(){}
  ngOnInit(): void{
    
    this.searchGroup = new FormGroup({
      controlEffect: new FormControl(),
        monstersGroup : new FormGroup({
        controlMonsters: new FormControl(this.checkedMonsters),         
        controlCreaturesFood: new FormControl(this.checkedCreaturesFood),
        controlCreaturesNoFood: new FormControl(this.checkedCreaturesNoFood) 
      }),
    });


    // Abonnements aux changements
    this.searchGroup.get('monstersGroup.controlMonsters')?.valueChanges.subscribe((value) => {
      this.checkedMonsters = value;
      this._updateListSlide(); 
    });

    this.searchGroup.get('monstersGroup.controlCreaturesFood')?.valueChanges.subscribe((value) => {
      this.checkedCreaturesFood = value;
      this._updateListSlide(); 
    });

    this.searchGroup.get('monstersGroup.controlCreaturesNoFood')?.valueChanges.subscribe((value) => {
      this.checkedCreaturesNoFood = value;
      this._updateListSlide(); 
    });

    this.searchGroup.get('controlEffect')?.valueChanges.subscribe((value: string[]) => {
      this.filteredEffects = value || [];
      this._updateListSlide();

    });


    this._updateListSlide();

    
  }

  displayEffect():string {
    if( this.filteredEffects.length>0){
      let first : string = this.filteredEffects[0];
      let taille : number = this.filteredEffects.length;
      if (taille === 1){
        return first;
      }
      else if (taille ===2){
        return first + "(+" + (taille-1) + ' other)' 
      }

      else{
        return first + "(+" + (taille-1) + ' others)' 
      }

    }
    return '';
  }

  _updateListSlide(): void {
    this.filteredData= this._filterListSlide();
    this.filteredData=  this.filteredData.concat(this._filterListEffect());
    this.filteredData= Array.from(new Set(this.filteredData.map(a => a.id)))
    .map(id => this.filteredData.find(a => a.id === id))
    .filter((item): item is IData => item !== undefined); 

  }

  private _filterListSlide(): IData[] {
    if (this.checkedMonsters && this.checkedCreaturesFood && this.checkedCreaturesNoFood) {
      return this.listData;

    } else if (this.checkedMonsters && this.checkedCreaturesFood && !this.checkedCreaturesNoFood) {
      return this.listData.filter(option =>
        (option.category === 'monster') ||
        (option.category === 'creature' && option.edible === true)
      );
    } else if (this.checkedMonsters && !this.checkedCreaturesFood && this.checkedCreaturesNoFood) {
      return this.listData.filter(option =>
        (option.category === 'monster') ||
        (option.category === 'creature' && option.edible === false)
      );
    } else if (this.checkedMonsters && !this.checkedCreaturesFood && !this.checkedCreaturesNoFood) {
      return this.listData.filter(option =>
        option.category === 'monster'
      );
    } else if (!this.checkedMonsters && this.checkedCreaturesFood && this.checkedCreaturesNoFood) {
      return this.listData.filter(option =>
        (option.category === 'creature')
      );
    } else if (!this.checkedMonsters && this.checkedCreaturesFood && !this.checkedCreaturesNoFood) {
      return this.listData.filter(option =>
        option.category === 'creature' && option.edible === true
      );
    } else if (!this.checkedMonsters && !this.checkedCreaturesFood && this.checkedCreaturesNoFood) {
      return this.listData.filter(option =>
        option.category === 'creature' && option.edible === false
      );
    } else {
      return []; 
    }
  }

  private _filterListEffect(): IData[] {
    let returnArray: IData[] = [];
  
    // Parcours des effets filtrés (filteredEffects)
    for (let i: number = 0; i < this.filteredEffects.length; i++) {
      // Ajout des éléments filtrés au tableau returnArray, sans doublons
      returnArray = returnArray.concat(
        this.listData.filter(option => option.cooking_effect === this.filteredEffects[i])
      );
    }
  
    // Éliminer les doublons basés sur l'ID ou tout autre critère unique
    return Array.from(new Set(returnArray.map(a => a.id)))
      .map(id => returnArray.find(a => a.id === id))
      .filter((item): item is IData => item !== undefined); // Filtrer les éléments undefined
  }
  
  


}
