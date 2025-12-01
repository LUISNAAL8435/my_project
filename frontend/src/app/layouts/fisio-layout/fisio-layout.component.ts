import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SiderbarComponent} from '../../shared/components/fisio/siderbar/siderbar';
import { HeaderPrincipalComponent } from '../../shared/components/fisio/header-principal/header-principal.component';

@Component({
  selector: 'app-fisio-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SiderbarComponent],
  templateUrl: './fisio-layout.component.html',
  styleUrls: ['./fisio-layout.component.scss']
})
export class FisiolayoutComponent implements OnInit {
  isSidebarExpanded = false;
id:number=0;
constructor(private route: ActivatedRoute){}
    ngOnInit() {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('ID del usuario:', this.id);
}
  onSidebarStateChange(isExpanded: boolean): void {
    this.isSidebarExpanded = isExpanded;
  }
}