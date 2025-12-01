import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-select',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() title?: string = '';
  @Input() label: string = '';
  @Input() options: { value: number; label: string }[] = [];
    @Input() valor: number=0;
    @Output() valorChange = new EventEmitter<number>(); 

  onSelectChange(event: any) {
    this.valorChange.emit(this.valor);
  }
}
