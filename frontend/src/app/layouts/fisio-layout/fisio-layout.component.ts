import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPrincipalComponent } from '../../shared/components/fisio/header-principal/header-principal.component';


@Component({
  selector: 'app-fisio-layout',
  standalone: true, // 👈 NECESARIO para que funcione con rutas standalone
  imports: [RouterOutlet,HeaderPrincipalComponent],
  templateUrl: './fisio-layout.component.html',
  styleUrls: ['./fisio-layout.component.scss'] // 👈 en plural
})
export class FisioLayoutComponent {

}
