import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsValidService {
  constructor() {}
  public minimumValid: boolean = false;
  public easy: boolean = false;
  public medium: boolean = false;
  public strong: boolean = false;

  clearValidation() {
    this.easy = false;
    this.medium = false;
    this.strong = false;
    this.minimumValid = false;
  }

  checkStrength(password: string) {
    this.clearValidation();
    if (password.length < 8) {
      this.minimumValid = false;
    } else if (
      /^[a-zA-Z]*$/.test(password) ||
      /^\d*$/.test(password) ||
      /^\W*$/.test(password)
    ) {
      this.minimumValid = true;
      this.easy = true;
    } else if (
      /^[A-Za-z0-9]*$/.test(password) ||
      /^[A-Za-z!@#$%^&*_+\-=\[\]{}();:'`"\\|,.<>\/?~]*$/.test(password) ||
      /^[0-9!@#$%^&*_+\-=\[\]{}();:'`"\\|,.<>\/?~]*$/.test(password)
    ) {
      this.minimumValid = true;
      this.easy = false;
      this.medium = true;
    } else if (
      /^[A-Za-z0-9!@#$%^&*_+\-=\[\]{}();:'`"\\|,.<>\/?~]*$/.test(password)
    ) {
      this.minimumValid = true;
      this.strong = true;
    }
  }
}
