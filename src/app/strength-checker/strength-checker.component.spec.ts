import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthCheckerComponent } from './strength-checker.component';

describe('StrengthCheckerComponent', () => {
  let component: StrengthCheckerComponent;
  let fixture: ComponentFixture<StrengthCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrengthCheckerComponent]
    });
    fixture = TestBed.createComponent(StrengthCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
