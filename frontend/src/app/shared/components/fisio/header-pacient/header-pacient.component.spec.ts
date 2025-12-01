import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPacientComponent } from './header-pacient.component';

describe('HeaderPacientComponent', () => {
  let component: HeaderPacientComponent;
  let fixture: ComponentFixture<HeaderPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPacientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
