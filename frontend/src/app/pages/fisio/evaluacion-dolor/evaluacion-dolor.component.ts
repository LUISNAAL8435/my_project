import { Component } from '@angular/core';
import { EvalucacionDeDolor } from '../../../core/interfaces/fisio/enfermedades.models';
import { FormsModule } from '@angular/forms';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';

@Component({
  selector: 'app-evaluacion-dolor',
  imports: [FormsModule],
  templateUrl: './evaluacion-dolor.component.html',
  styleUrl: './evaluacion-dolor.component.scss'
})
export class EvaluacionDolorComponent {
evalucacionDeDolor:EvalucacionDeDolor={
    donde_le_duele:'',
    parestesia:'',
    disestesia:'',
    sensacionDeElectricidad:'',
    elDolorSeIrradiaEnOtraZona:'',
    elDolorEmpezoDespuesDelMecanismoDeLesion:'',
    elDolorEmpezoDeLaNada:'',
    queExacerbaSuDolor:'',
    queInhibeSuDolor:'',
    elDolorSeMantieneDeFormaPuntualOEnLaZona:'',
    elDolorSeDesplazaAOtraZona:'',
    dolorTipoArdor:'',
    dolorTipoPunzante:'',
    nivelDeDolor:'',
  }
constructor(private genericService:GenericServiceService){}
enviarEvaluacion(){
  const pacienteId=1;

  const evaluaciondolor={
    paciente_id:pacienteId,
    titulo:"EVALUACIÓN DOLOR",
    datos:this.evalucacionDeDolor
  }
  console.log('📤 Enviando test isotónico:', JSON.stringify(evaluaciondolor, null, 2));
  this.genericService.create<any>('evaluation', evaluaciondolor).subscribe({
    next: res => console.log(`✅ ${evaluaciondolor.titulo} guardado`, res),
    error: err => console.error(`❌ Error en ${evaluaciondolor.titulo}`, err)
  });
}
}
