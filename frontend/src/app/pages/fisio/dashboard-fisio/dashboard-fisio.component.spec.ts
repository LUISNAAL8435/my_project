import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFisioComponent } from './dashboard-fisio.component';

describe('DashboardFisioComponent', () => {
  let component: DashboardFisioComponent;
  let fixture: ComponentFixture<DashboardFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFisioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
