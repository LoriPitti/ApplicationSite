import { Component } from '@angular/core';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  title: string = 'Candidatura'
  status = 'refused'
  deadline: 'inviata il: ' | 'completare entro:' = 'inviata il: ';
  data: Date = new Date(2024, 3, 12);
}
