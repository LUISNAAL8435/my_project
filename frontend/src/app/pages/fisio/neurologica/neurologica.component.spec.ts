import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeurologicaComponent } from './neurologica.component';

describe('NeurologicaComponent', () => {
  let component: NeurologicaComponent;
  let fixture: ComponentFixture<NeurologicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeurologicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeurologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
