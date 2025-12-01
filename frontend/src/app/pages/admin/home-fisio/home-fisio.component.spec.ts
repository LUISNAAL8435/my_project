import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFisioComponent } from './home-fisio.component';

describe('HomeFisioComponent', () => {
  let component: HomeFisioComponent;
  let fixture: ComponentFixture<HomeFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFisioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
