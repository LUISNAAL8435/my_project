import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniAtencionComponent } from './uni-atencion.component';

describe('UniAtencionComponent', () => {
  let component: UniAtencionComponent;
  let fixture: ComponentFixture<UniAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniAtencionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
