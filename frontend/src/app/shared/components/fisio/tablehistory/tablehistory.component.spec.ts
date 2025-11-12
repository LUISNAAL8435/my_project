import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablehistoryComponent } from './tablehistory.component';

describe('TablehistoryComponent', () => {
  let component: TablehistoryComponent;
  let fixture: ComponentFixture<TablehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablehistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
