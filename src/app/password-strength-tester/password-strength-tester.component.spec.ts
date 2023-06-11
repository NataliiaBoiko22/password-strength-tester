import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthTesterComponent } from './password-strength-tester.component';

describe('PasswordStrengthTesterComponent', () => {
  let component: PasswordStrengthTesterComponent;
  let fixture: ComponentFixture<PasswordStrengthTesterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordStrengthTesterComponent]
    });
    fixture = TestBed.createComponent(PasswordStrengthTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
