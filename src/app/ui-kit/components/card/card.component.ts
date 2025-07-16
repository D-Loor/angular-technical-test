import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  cardData = input<ICard>();
  componentOutputs:  { [key: string]: (event: any) => void } = {};

}