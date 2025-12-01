import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaFisioComponent } from './agenda-fisio.component';

describe('AgendaFisioComponent', () => {
  let component: AgendaFisioComponent;
  let fixture: ComponentFixture<AgendaFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaFisioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
