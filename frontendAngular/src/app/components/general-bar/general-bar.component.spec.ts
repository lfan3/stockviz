import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBarComponent } from './general-bar.component';

describe('GeneralBarComponent', () => {
  let component: GeneralBarComponent;
  let fixture: ComponentFixture<GeneralBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
