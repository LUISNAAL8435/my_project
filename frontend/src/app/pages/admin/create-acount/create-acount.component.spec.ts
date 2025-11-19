import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountComponent } from './create-acount.component';

describe('CreateAcountComponent', () => {
  let component: CreateAcountComponent;
  let fixture: ComponentFixture<CreateAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAcountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
