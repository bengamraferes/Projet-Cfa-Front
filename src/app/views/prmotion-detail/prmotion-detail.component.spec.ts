import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrmotionDetailComponent } from './prmotion-detail.component';

describe('PrmotionDetailComponent', () => {
  let component: PrmotionDetailComponent;
  let fixture: ComponentFixture<PrmotionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrmotionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrmotionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
