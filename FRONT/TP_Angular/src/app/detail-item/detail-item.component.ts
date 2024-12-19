import { Component, OnInit } from '@angular/core';
import { IData } from '../../IData';
import { EMPTY, empty } from 'rxjs';
import { DATA } from '../../mock-data';
import { ActivatedRoute } from '@angular/router';
import { DataMockService } from '../data-mock.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-detail-item',
  imports: [CommonModule],
  templateUrl: './detail-item.component.html',
  styleUrl: './detail-item.component.css'
})
export class DetailItemComponent implements OnInit {
  entry: IData = DATA[0];

  constructor(
    private route: ActivatedRoute,
    private dataMockService: DataMockService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); // Conversion en nombre
      if (id) {
        this.loadEntryById(id); // Appelle la méthode pour récupérer les données
      }
    });
  }

  loadEntryById(id: number): void {
    this.dataMockService.getItemById(id).subscribe({
      next: (data) => {
        this.entry = data;
        console.log('Donnée récupérée:', this.entry);
      },
      error: (err) => console.error('Erreur lors de la récupération:', err)
    });
  }
}