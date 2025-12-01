import { Component, Input, OnInit } from '@angular/core';
import { EvalucacionDeDolor } from '../../../core/interfaces/fisio/enfermedades.models';
import { FormsModule } from '@angular/forms';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-evaluacion-dolor',
  imports: [FormsModule, NgFor],
  templateUrl: './evaluacion-dolor.component.html',
  styleUrl: './evaluacion-dolor.component.scss'
})
export class EvaluacionDolorComponent implements OnInit {
  evaluaciones: any[] = [];
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
  ngOnInit(): void {
    this.getDatos();
  }
 @Input() paciente!: Paciente;
enviarEvaluacion(){
  const pacienteId=this.paciente.id;

  const evaluaciondolor={
    paciente_id:pacienteId,
    titulo:"EVALUACIÓN DOLOR",
    datos:this.evalucacionDeDolor
  }
  console.log('📤 Enviando test isotónico:', JSON.stringify(evaluaciondolor, null, 2));
  this.genericService.create<any>('evaluation', evaluaciondolor).subscribe({
    next: res => {
      console.log(`✅ ${evaluaciondolor.titulo} guardado`, res)
      this.getDatos()
    this.limpiarFormulario()},
    error: err => console.error(`❌ Error en ${evaluaciondolor.titulo}`, err),
  });
}
limpiarFormulario() {
  this.evalucacionDeDolor = {
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
  };
}
getDatos(){
  const id_paciente=this.paciente.id
  this.genericService.getById("evaluation/id_paciente",id_paciente).subscribe((res:any)=>{
    this.evaluaciones = res;
    console.error("Datos recibidos desde la bse de daros",res);
  })
}
verDatos(id:number){
  this.genericService.getById("evaluation/id",id).subscribe((res:any)=>{
    this.evalucacionDeDolor =  res.datos;
    console.error("Datos recibidos desde la bse de daros",res);
  })
}
eliminarDato(id:number){
  if (!confirm("¿Seguro que quieres eliminar este registro?")) return;

  this.genericService.delete("evaluation", id).subscribe({
    next: (res) => {
      console.log("Eliminado correctamente", res);

      // Si tienes un arreglo local, aquí lo actualizas
      this.evaluaciones = this.evaluaciones.filter(d => d.id !== id);
    },
    error: (err) => {
      console.error("Error al eliminar:", err);
    }
  });
}
}
