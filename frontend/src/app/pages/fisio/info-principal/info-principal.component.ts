import { Component } from '@angular/core';
import { HistoralComponent } from "../historal/historal.component";
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-principal',
  standalone:true,
  imports: [HistoralComponent],
  templateUrl: './info-principal.component.html',
  styleUrl: './info-principal.component.scss'
})
export class InfoPrincipalComponent {

}
