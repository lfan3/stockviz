import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCharComponent } from './example-char.component';

describe('ExampleCharComponent', () => {
  let component: ExampleCharComponent;
  let fixture: ComponentFixture<ExampleCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCharComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
