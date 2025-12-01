import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioeconomicStudyComponent } from './socioeconomic-study.component';

describe('SocioeconomicStudyComponent', () => {
  let component: SocioeconomicStudyComponent;
  let fixture: ComponentFixture<SocioeconomicStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocioeconomicStudyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioeconomicStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
