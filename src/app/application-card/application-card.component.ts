import { Component } from '@angular/core';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  link = 'link'
  corso: string = 'Nome del corso'
  dipartimento = 'nome del dipartimento'
  universita = 'nome dell\'università'
  paese = 'Nome del paese';
  tipo = 'tipo'
  descrizione = 'lorem dipsiu imum lorem dipsiu imum lorem dipsiu imum lorem dipsiu imum lorem dipsiu imum lorem dipsiu imum '

}
