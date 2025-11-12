import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiderbarComponent} from '../../shared/components/fisio/siderbar/siderbar';
import { HeaderPrincipalComponent } from '../../shared/components/fisio/header-principal/header-principal.component';

@Component({
  selector: 'app-fisio-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SiderbarComponent],
  templateUrl: './fisio-layout.component.html',
  styleUrls: ['./fisio-layout.component.scss']
})
export class FisiolayoutComponent {
  isSidebarExpanded = false;

  onSidebarStateChange(isExpanded: boolean): void {
    this.isSidebarExpanded = isExpanded;
  }
}