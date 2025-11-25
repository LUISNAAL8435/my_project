import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './siderbar.html',
  styleUrls: ['./siderbar.scss']
})
export class SiderbarComponent {
  hovering = false;         // Hover en desktop
  sidebarOpen = false;      // Click en móvil
  activeItem = 'Dashboard';

  @Input() id: number = 0;
  @Output() sidebarStateChange = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private router: Router) {}

  setActive(item: string): void {
    this.activeItem = item;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarStateChange.emit(this.sidebarOpen);
  }

  onMouseEnter(): void {
    this.hovering = true;
    this.sidebarStateChange.emit(true);
  }

  onMouseLeave(): void {
    this.hovering = false;
    this.sidebarStateChange.emit(false);
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }

  // Opcional: cerrar automáticamente el sidebar en móviles al navegar
  onNavigate(): void {
    if (window.innerWidth < 768) { // ejemplo breakpoint md
      this.sidebarOpen = false;
    }
  }
}