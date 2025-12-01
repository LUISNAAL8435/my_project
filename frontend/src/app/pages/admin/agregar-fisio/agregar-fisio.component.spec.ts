import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFisioComponent } from './agregar-fisio.component';

describe('AgregarFisioComponent', () => {
  let component: AgregarFisioComponent;
  let fixture: ComponentFixture<AgregarFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarFisioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
