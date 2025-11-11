import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar RouterModule
  templateUrl: './siderbar.html',
  styleUrls: ['./siderbar.scss']
})
export class SiderbarComponent {
  hovering = false;
  activeItem = 'Dashboard';
  
  @Output() sidebarStateChange = new EventEmitter<boolean>();

  setActive(item: string): void {
    this.activeItem = item;
  }

  onMouseEnter(): void {
    this.hovering = true;
    this.sidebarStateChange.emit(true);
  }

  onMouseLeave(): void {
    this.hovering = false;
    this.sidebarStateChange.emit(false);
  }
}