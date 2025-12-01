import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-sidebar-admin',
  imports: [NgIf,CommonModule, RouterModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent {
  hovering = false;
  activeItem = 'Dashboard';
  @Output() sidebarStateChange = new EventEmitter<boolean>();
constructor(private auth:AuthService, private router:Router){}
  setActive(item: string): void {
    this.activeItem = item;
  }

  onMouseEnter(): void {
    this.hovering = true;
    this.sidebarStateChange.emit(true);
  }
  cerrarSesion() {
  this.auth.logout();      // Limpia localStorage
  this.router.navigate(['']);  // Redirige al login
}

  onMouseLeave(): void {
    this.hovering = false;
    this.sidebarStateChange.emit(false);
  }
}
