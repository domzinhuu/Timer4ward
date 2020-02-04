import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedMonthComponent } from './consolidated-month.component';

describe('ConsolidatedMonthComponent', () => {
  let component: ConsolidatedMonthComponent;
  let fixture: ComponentFixture<ConsolidatedMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
