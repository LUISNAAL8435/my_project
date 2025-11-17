import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../../../core/interfaces/fisio/patients.models';
@Component({
  selector: 'app-header-pacient',
  imports: [],
  templateUrl: './header-pacient.component.html',
  styleUrl: './header-pacient.component.scss'
})
export class HeaderPacientComponent {
 @Output() clickGenerico = new EventEmitter<void>();
 @Input() paciente!: Paciente;
  emitirEvento() {
    this.clickGenerico.emit(); // 🔥 Emite el evento al padre
  }
}
