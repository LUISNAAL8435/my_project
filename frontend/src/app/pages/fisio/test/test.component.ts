import { Component, Input, OnInit } from '@angular/core';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { TestIsometricoBaumanometro, TestIsotonicoConPeso } from '../../../core/interfaces/fisio/enfermedades.models';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';

@Component({
  selector: 'app-test',
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  @Input() paciente!: Paciente;
testIsometricoBaumanometro:TestIsometricoBaumanometro={
    flexion_hombro:'',
    extension_hombro:'',
    aduccion_hombro:'',
    r_i_de_hombro:'',
    r_e_de_hombro:'',
    flexion_de_codo:'',
    extension_de_codo:'',
    flexion_de_cadera:'',
    extension_de_cadera:'',
    abduccion_de_cadera:'',
    aduccion_De_cadera:'',
    r_i_de_cadera:'',
    r_e_de_cadera:'',
    flexion_de_rodilla:'',
    extension_de_rodilla:'',
    flexion_plantar_tobillo:'',
    flexion_dorsal_tobillo:'',
  }
 testIsotonicoConPeso:TestIsotonicoConPeso={
    flexion_hombro:{kgDerecho:0,KgIquierdo:0,resultado:0},
    extension_hombro:{kgDerecho:0,KgIquierdo:0,resultado:0},
        aduccion_hombro:{kgDerecho:0,KgIquierdo:0,resultado:0},
        r_i_de_hombro:{kgDerecho:0,KgIquierdo:0,resultado:0},
        r_e_de_hombro:{kgDerecho:0,KgIquierdo:0,resultado:0},
        flexion_de_codo:{kgDerecho:0,KgIquierdo:0,resultado:0},
        extension_de_codo:{kgDerecho:0,KgIquierdo:0,resultado:0},
        flexion_de_cadera:{kgDerecho:0,KgIquierdo:0,resultado:0},
        extension_de_cadera:{kgDerecho:0,KgIquierdo:0,resultado:0},
        abduccion_de_cadera:{kgDerecho:0,KgIquierdo:0,resultado:0},
        aduccion_De_cadera:{kgDerecho:0,KgIquierdo:0,resultado:0},
        r_i_de_cadera:{kgDerecho:0,KgIquierdo:0,resultado:0},
        r_e_de_cadera:{kgDerecho:0,KgIquierdo:0,resultado:0},
        flexion_de_rodilla:{kgDerecho:0,KgIquierdo:0,resultado:0},
        extension_de_rodilla:{kgDerecho:0,KgIquierdo:0,resultado:0},
        flexion_plantar_tobillo:{kgDerecho:0,KgIquierdo:0,resultado:0},
        flexion_dorsal_tobillo:{kgDerecho:0,KgIquierdo:0,resultado:0},
  }
constructor(private genericService:GenericServiceService){
}
  ngOnInit(): void {
    this.obtenerdatos();
  }
  obtenerdatos(){
    this.genericService.getById<any[]>('test', this.paciente.id).subscribe(res => {

  const iso = res.find(item => item.titulo === 'ISOMETRICO');
  if (iso) {
  this.testIsometricoBaumanometro = Object.fromEntries(
    Object.entries(iso.datos).map(([key, value]: any) => [
      key,
      value.valor ?? ''  // ← extrae solo el valor
    ])
  ) as TestIsometricoBaumanometro;
}

  const iso2 = res.find(item => item.titulo === 'ISOTONICO');
    if (iso2) this.testIsotonicoConPeso = iso2.datos;
});

  }
 enviarTest() {
  const pacienteId = this.paciente.id;
  this.calcular(); // ← asumo que esto llena los valores correctamente

// --- Enviar test isométrico ---
const datosIsometrico = Object.fromEntries(
  Object.entries(this.testIsometricoBaumanometro).map(([key, value]) => [
    key,
    { valor: String(value ?? "") }  // 👈 transformamos cada campo en un objeto con clave "valor"
  ])
);

const isometrico = {
  paciente_id: pacienteId,
  titulo: "ISOMETRICO",
  datos: datosIsometrico
};
  console.log('📤 Enviando test isométrico:', JSON.stringify(isometrico, null, 2));

  this.genericService.create<any>('test/isometrico', isometrico).subscribe({
    next: res => console.log(`✅ ${isometrico.titulo} guardado`, res),
    error: err => console.error(`❌ Error en ${isometrico.titulo}`, err)
  });

  // --- Enviar test isotónico ---
  const isotonico = {
    paciente_id: pacienteId,
    titulo: "ISOTONICO",
    datos: this.testIsotonicoConPeso
  };
  console.log('📤 Enviando test isotónico:', JSON.stringify(isotonico, null, 2));

  this.genericService.create<any>('test/isotonico', isotonico).subscribe({
    next: res => console.log(`✅ ${isotonico.titulo} guardado`, res),
    error: err => console.error(`❌ Error en ${isotonico.titulo}`, err)
  });
}

calcular() {
  // Recorremos todas las claves del objeto testIsotonicoConPeso
  Object.keys(this.testIsotonicoConPeso).forEach((key) => {
    const ejercicio = this.testIsotonicoConPeso[key as keyof TestIsotonicoConPeso];

    // Verificamos que el ejercicio tenga los valores esperados
    if (ejercicio && typeof ejercicio.kgDerecho === 'number' && typeof ejercicio.KgIquierdo === 'number') {
      ejercicio.resultado = ejercicio.kgDerecho + ejercicio.KgIquierdo;
    }
  });
}
}
