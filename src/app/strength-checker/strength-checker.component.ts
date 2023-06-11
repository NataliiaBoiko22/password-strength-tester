import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter,
} from '@angular/core';
import { IsValidService } from '../service/is-valid.service';

@Component({
  selector: 'app-strength-checker',
  templateUrl: './strength-checker.component.html',
  styleUrls: ['./strength-checker.component.scss'],
})
export class StrengthCheckerComponent implements OnChanges {
  constructor(private isValidService: IsValidService) {}

  @Input() public passwordToVerify: string | null | undefined;
  @Input() public barLabel: string = '';
  @Output() passwordStrength = new EventEmitter<boolean>();

  bar0: string = '';
  bar1: string = '';
  bar2: string = '';
  msg: string = '';

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (
      changes['passwordToVerify'] &&
      changes['passwordToVerify'].currentValue
    ) {
      this.updatePasswordStrength(changes['passwordToVerify'].currentValue);
    }
  }

  private updatePasswordStrength(password: string) {
    if (!password || password.length === 0) {
      this.bar0 = 'grey';
      this.bar1 = 'grey';
      this.bar2 = 'grey';
      this.passwordStrength.emit(false);
      this.msg = 'Please enter your password';
    } else {
      this.isValidService.checkStrength(password);

      if (this.isValidService.minimumValid) {
        if (this.isValidService.easy) {
          this.bar0 = 'red';
          this.bar1 = 'grey';
          this.bar2 = 'grey';
          this.passwordStrength.emit(false);
          this.barLabel = 'EASY';
          this.msg = 'Password must contain letters, numbers and symbols';
        } else if (this.isValidService.medium) {
          console.log('medium');
          this.bar0 = 'orange';
          this.bar1 = 'orange';
          this.bar2 = 'grey';
          this.passwordStrength.emit(false);
          this.barLabel = 'MEDIUM';
          this.msg = 'Password must contain letters, numbers and symbols';
        } else if (this.isValidService.strong) {
          this.bar0 = 'green';
          this.bar1 = 'green';
          this.bar2 = 'green';
          this.passwordStrength.emit(true);
          this.barLabel = 'STRONG';
          this.msg = '';
        }
      } else {
        this.bar0 = 'red';
        this.bar1 = 'red';
        this.bar2 = 'red';
        this.passwordStrength.emit(false);
        this.msg = 'Password must have min 8 characters';
      }
    }
  }
}
