import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'


@Component({
  selector: 'app-item',
  imports: [MatCardModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

}
