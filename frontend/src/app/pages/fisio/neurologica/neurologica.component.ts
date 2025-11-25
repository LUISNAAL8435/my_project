import { Component, Input, OnInit } from '@angular/core';
import { Test1MiembroInferior, EvaluacionMarcha ,Test1MiembroSuperior, TestMiembroInferior, TestMiembroSuperior } from '../../../core/interfaces/fisio/enfermedades.models';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
@Component({
  selector: 'app-neurologica',
  imports: [FormsModule],
  templateUrl: './neurologica.component.html',
  styleUrl: './neurologica.component.scss'
})
export class NeurologicaComponent implements OnInit {
  @Input() paciente!: Paciente;
  testMiembroSuperior:TestMiembroSuperior={
    c5:{musculo:'deltoides',estado:'normal'},
    c6:{musculo:'biceps braquial y extensores de muneca',estado:'normal'},
    c7:{musculo:'flexor radial del campo y triceps ',estado:'normal'},
    c8:{musculo:'abductor del primer dedo',estado:'normal'},
    t1:{musculo:'primer musculo interóseo dorsal',estado:'normal'},
  }
  testMiembroInferior:TestMiembroInferior={
    l2:{musculo:'psoas',estado:'normal'},
    l3:{musculo:'cuadriceps',estado:'normal'},
    l4:{musculo:'tibia anterior',estado:'normal'},
    l5:{musculo:'extensor del hallux',estado:'normal'},
    s1:{musculo:'triceps sural',estado:'normal'},
    s2:{musculo:'isquiotibiales',estado:'normal'},
  }

  //----------------------

  test2MiembroSuperior:Test1MiembroSuperior={
    c5:{zonas:'region lateral del hombro y brazo',estado:'normal',alterada:'disminuida'},
    c6:{zonas:'region lateral del brazo-antebrazo y mano',estado:'normal',alterada:'disminuida'},
    c7:{zonas:'parte media de la mano y dedo medio',estado:'normal',alterada:'disminuida'},
    c8:{zonas:'cara interna de antebrazo y mano',estado:'normal',alterada:'disminuida'},
    t1:{zonas:'parte medial del antebrazo y brazo',estado:'normal',alterada:'disminuida'},
  }
    test2MiembroInferior:Test1MiembroInferior={
    l2:{zonas:'cara anterior del muslo',estado:'normal',alterada:'disminuida'},
    l3:{zonas:'condilo femoral izquierdo',estado:'normal',alterada:'disminuida'},
    l4:{zonas:'maleolo interno',estado:'normal',alterada:'disminuida'},
    l5:{zonas:'cara dorsal del pie',estado:'normal',alterada:'disminuida'},
    s1:{zonas:'borde externo del talon',estado:'normal',alterada:'disminuida'},
    s2:{zonas:'lineal media de la fosa popitlea',estado:'normal',alterada:'disminuida'},
  }
  evaluacionMarcha:EvaluacionMarcha={
    dato1:'normal',
    datod2:'normal',
    dato3:'normal',
    datos4:'normal',
    datos5:'normal',
    datos6:'normal',
    dato7:'normal',
    datos8:'normal',
    dato9:'normal',
    datos10:'normal'
  }
  
  constructor(private genericService:GenericServiceService){}
  ngOnInit(): void {
    this.obtenerdatos();
  }

obtenerdatos() {
  this.genericService.getById<any[]>('peripheral', this.paciente.id)
    .subscribe(res => {
      
      // TEST 1 SUPERIOR
      const t1sup = res.find(item => item.titulo === "miembosuperiortestuno");
      if (t1sup) this.testMiembroSuperior = t1sup.datos;

      // TEST 1 INFERIOR
      const t1inf = res.find(item => item.titulo === "miemboinferiortestuno");
      if (t1inf) this.testMiembroInferior = t1inf.datos;

      // TEST 2 SUPERIOR
      const t2sup = res.find(item => item.titulo === "miembosuperiortestdos");
      if (t2sup) this.test2MiembroSuperior = t2sup.datos;

      // TEST 2 INFERIOR
      const t2inf = res.find(item => item.titulo === "miemboinferiortestdos");
      if (t2inf) this.test2MiembroInferior = t2inf.datos;

      console.log("🧠 Datos neurológicos cargados:", {
        t1sup: this.testMiembroSuperior,
        t1inf: this.testMiembroInferior,
        t2sup: this.test2MiembroSuperior,
        t2inf: this.test2MiembroInferior
      });

    });

    this.genericService.getById<any>('marcha',this.paciente.id).subscribe(res=>{
      console.log("datos obtenenodos", res)
      if (res && res[0].datos) {
        this.evaluacionMarcha = res[0].datos;
      } else {
        // si no hay registro, dejar los valores por defecto
        this.evaluacionMarcha = {
          dato1:'normal',
          datod2:'normal',
          dato3:'normal',
          datos4:'normal',
          datos5:'normal',
          datos6:'normal',
          dato7:'normal',
          datos8:'normal',
          dato9:'normal',
          datos10:'Normal'
        };
      }
      alert('Datos obtenidos')
    })
}


  enviartestNeorologica(){
    const pacienteId=this.paciente.id;
    
    const grupos=[
    {
      paciente_id:pacienteId,
      titulo:"miembosuperiortestuno",
      datos:this.testMiembroSuperior
    },
    {
      paciente_id:pacienteId,
      titulo:"miemboinferiortestuno",
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
      titulo:"miembosuperiortestdos",
      datos:this.test2MiembroSuperior
    },
    {
      paciente_id:pacienteId,
      titulo:"miemboinferiortestdos",
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

  const marcha={
    paciente_id:pacienteId,
    titulo:"Evualuacion_Marcha",
    datos:this.evaluacionMarcha
  }    
  console.log('📤 Payload que se envía al backend:', JSON.stringify(marcha, null, 2))
  this.genericService.create<any>('marcha',marcha).subscribe({
    next:res=>alert('Guardado'),
    error:err=>alert('Aerror al guardar')
  })
  }
}
