import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerInputComponent } from './sticker-input.component';

describe('StickerInputComponent', () => {
  let component: StickerInputComponent;
  let fixture: ComponentFixture<StickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
