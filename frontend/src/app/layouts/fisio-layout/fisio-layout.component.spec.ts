import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisioLayoutComponent } from './fisio-layout.component';

describe('FisioLayoutComponent', () => {
  let component: FisioLayoutComponent;
  let fixture: ComponentFixture<FisioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FisioLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FisioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
