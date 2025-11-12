import { Component } from '@angular/core';
import { Test1MiembroInferior, Test1MiembroSuperior, TestMiembroInferior, TestMiembroSuperior } from '../../../core/interfaces/fisio/enfermedades.models';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-neurologica',
  imports: [FormsModule],
  templateUrl: './neurologica.component.html',
  styleUrl: './neurologica.component.scss'
})
export class NeurologicaComponent {
  testMiembroSuperior:TestMiembroSuperior={
    c5:{musculo:'Deltoides',estado:'normal'},
    c6:{musculo:'Bíceps braquial y extensores de muñeca',estado:'normal'},
    c7:{musculo:'Flexor radial del campo y tríceps ',estado:'normal'},
    c8:{musculo:'Abductor del primer dedo',estado:'normal'},
    t1:{musculo:'Primer musculo interóseo dorsal',estado:'normal'},
  }
  testMiembroInferior:TestMiembroInferior={
    l2:{musculo:'Psoas',estado:'normal'},
    l3:{musculo:'cuádriceps',estado:'normal'},
    l4:{musculo:'Tibia anterior',estado:'normal'},
    l5:{musculo:'Extensor del hallux',estado:'normal'},
    s1:{musculo:'Tríceps sural',estado:'normal'},
    s2:{musculo:'Isquiotibiales',estado:'normal'},
  }

  //----------------------

  test2MiembroSuperior:Test1MiembroSuperior={
    c5:{zonas:'Región lateral del hombro y brazo',estado:'normal',alterada:'disminuida'},
    c6:{zonas:'Región lateral del brazo-antebrazo y mano',estado:'normal',alterada:'disminuida'},
    c7:{zonas:'Parte media de la mano y dedo medio',estado:'normal',alterada:'disminuida'},
    c8:{zonas:'Cara interna de antebrazo y mano',estado:'normal',alterada:'disminuida'},
    t1:{zonas:'Parte medial del antebrazo y brazo',estado:'normal',alterada:'disminuida'},
  }
    test2MiembroInferior:Test1MiembroInferior={
    l2:{zonas:'Cara anterior del muslo',estado:'normal',alterada:'disminuida'},
    l3:{zonas:'Cóndilo femoral izquierdo',estado:'normal',alterada:'disminuida'},
    l4:{zonas:'Maléolo interno',estado:'normal',alterada:'disminuida'},
    l5:{zonas:'Cara dorsal del pie',estado:'normal',alterada:'disminuida'},
    s1:{zonas:'Borde externo del talón',estado:'normal',alterada:'disminuida'},
    s2:{zonas:'Lineal media de la fosa popitlea',estado:'normal',alterada:'disminuida'},
  }
  
  constructor(private genericService:GenericServiceService){}

  enviartestNeorologica(){
    const pacienteId=1;
    
    const grupos=[
    {
      paciente_id:pacienteId,
      titulo:"Test miembro superior",
      datos:this.testMiembroSuperior
    },
    {
      paciente_id:pacienteId,
      titulo:"Test miembro inferior",
      datos:this.testMiembroInferior
    }
  ];

  grupos.forEach((grupo)=>{
    console.log('📤 Payload que se envía al backend:', JSON.stringify(grupo, null, 2))
    this.genericService.create<any>('peripheral/test1',grupo).subscribe({
                  next: res => console.log(`✅ ${grupo.titulo} guardado`, res),
                  error: err => console.error(`❌ Error en ${grupo.titulo}`, err)
    })
  })

  const grupo2=[
    {
      paciente_id:pacienteId,
      titulo:"Test miembro superior",
      datos:this.test2MiembroSuperior
    },
    {
      paciente_id:pacienteId,
      titulo:"Test miembro inferior",
      datos:this.test2MiembroInferior
    }
  ];
  grupo2.forEach((grupo2)=>{
    console.log('📤 Payload que se envía al backend:', JSON.stringify(grupo2, null, 2))
    this.genericService.create<any>('peripheral/test2',grupo2).subscribe({
                  next: res => console.log(`✅ ${grupo2.titulo} guardado`, res),
                  error: err => console.error(`❌ Error en ${grupo2.titulo}`, err)
    })
  })
  }
}
