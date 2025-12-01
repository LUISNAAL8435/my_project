import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-actions.component.html',
  styleUrls: ['./validation-actions.component.scss']
})
export class ValidationActionsComponent {
  @Input() entityType: string = 'elemento';
  @Input() showDelete: boolean = true;
  @Input() showUpdate: boolean = true;
  @Input() showRegister: boolean = true;
  @Input() showCancel: boolean = true; // ← Propiedad agregada
  
  @Output() onDelete = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() onRegister = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  delete() {
    this.onDelete.emit();
  }

  update() {
    this.onUpdate.emit();
  }

  register() {
    this.onRegister.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}