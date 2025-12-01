import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SiderbarComponent } from '../../shared/components/fisio/siderbar/siderbar';
import { SidebarAdminComponent } from "../../shared/components/fisio/sidebar-admin/sidebar-admin.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SiderbarComponent, SidebarAdminComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent{
  isSidebarExpanded = false;
constructor(private route: ActivatedRoute){}
  onSidebarStateChange(isExpanded: boolean): void {
    this.isSidebarExpanded = isExpanded;
  }
}
