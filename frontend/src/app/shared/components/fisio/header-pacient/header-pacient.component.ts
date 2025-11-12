import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-pacient',
  imports: [],
  templateUrl: './header-pacient.component.html',
  styleUrl: './header-pacient.component.scss'
})
export class HeaderPacientComponent {
 @Output() clickGenerico = new EventEmitter<void>();

  emitirEvento() {
    this.clickGenerico.emit(); // 🔥 Emite el evento al padre
  }
}
