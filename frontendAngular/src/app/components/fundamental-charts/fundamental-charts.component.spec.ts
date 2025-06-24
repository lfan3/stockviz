import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalChartsComponent } from './fundamental-charts.component';

describe('FundamentalChartsComponent', () => {
  let component: FundamentalChartsComponent;
  let fixture: ComponentFixture<FundamentalChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundamentalChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundamentalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
