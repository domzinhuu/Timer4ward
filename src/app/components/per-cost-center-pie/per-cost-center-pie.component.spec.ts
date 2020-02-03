import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerCostCenterPieComponent } from './per-cost-center-pie.component';

describe('PerCostCenterPieComponent', () => {
  let component: PerCostCenterPieComponent;
  let fixture: ComponentFixture<PerCostCenterPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerCostCenterPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerCostCenterPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
