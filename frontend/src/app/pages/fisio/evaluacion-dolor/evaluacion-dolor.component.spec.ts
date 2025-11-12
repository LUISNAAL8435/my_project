import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionDolorComponent } from './evaluacion-dolor.component';

describe('EvaluacionDolorComponent', () => {
  let component: EvaluacionDolorComponent;
  let fixture: ComponentFixture<EvaluacionDolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionDolorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionDolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
