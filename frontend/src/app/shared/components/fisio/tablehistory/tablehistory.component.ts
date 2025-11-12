import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablehistory',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './tablehistory.component.html',
  styleUrls: ['./tablehistory.component.scss']
})
export class TablehistoryComponent {
 @Input() title: string = '';
  @Input() data: any = {};

  @Output() formChange = new EventEmitter<any>();

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  emitChange() {
    this.formChange.emit(this.data);
  }
}
