import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoralComponent } from './historal.component';

describe('HistoralComponent', () => {
  let component: HistoralComponent;
  let fixture: ComponentFixture<HistoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
