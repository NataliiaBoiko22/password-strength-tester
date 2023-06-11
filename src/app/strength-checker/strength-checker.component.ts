// import {
//   Component,
//   Input,
//   OnChanges,
//   SimpleChange,
//   Output,
//   EventEmitter,
// } from '@angular/core';
// import { IsValidService } from '../service/is-valid.service';
// @Component({
//   selector: 'app-strength-checker',
//   templateUrl: './strength-checker.component.html',
//   styleUrls: ['./strength-checker.component.scss'],
// })
// export class StrengthCheckerComponent implements OnChanges {
//   constructor(private isValidService: IsValidService) {}
//   @Input() public passwordToVerify: string | null | undefined;
//   @Input() public barLabel: string = '';
//   @Output() passwordStrength = new EventEmitter<boolean>();
//   bar0: string = '';
//   bar1: string = '';
//   bar2: string = '';
//   [key: string]: any;
//   msg = '';

//   private colors = ['darkred', 'orangered', 'orange'];
//   private static checkStrength(password: string) {
//     let force = 0;
//     const regex = /[$-/:-?{-~!"^_@`\[\]]/g;

//     const lowerLetters = /[a-z]+/.test(password);
//     const upperLetters = /[A-Z]+/.test(password);
//     const numbers = /[0-9]+/.test(password);
//     const symbols = regex.test(password);

//     const flags = [lowerLetters, upperLetters, numbers, symbols];

//     let passedMatches = 0;
//     for (const flag of flags) {
//       passedMatches += flag === true ? 1 : 0;
//     }

//     force += 2 * password.length + (password.length >= 10 ? 1 : 0);
//     force += passedMatches * 10;

//     // short password
//     force = password.length <= 8 ? Math.min(force, 10) : force;

//     // poor variety of characters
//     force = passedMatches === 1 ? Math.min(force, 10) : force;
//     force = passedMatches === 2 ? Math.min(force, 20) : force;
//     force = passedMatches === 3 ? Math.min(force, 30) : force;

//     return force;
//   }

//   ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
//     const password = changes['passwordToVerify'].currentValue;
//     // console.log(passwordToVerify.currentValue);
//     this.setBarColors(4, '#DDD');
//     if (password) {
//       const c = this.getColor(StrengthCheckerComponent.checkStrength(password));
//       this.setBarColors(c.idx, c.col);

//       const pwdStrength = StrengthCheckerComponent.checkStrength(password);
//       pwdStrength === 40
//         ? this.passwordStrength.emit(true)
//         : this.passwordStrength.emit(false);

//       switch (c.idx) {
//         case 1:
//           this.msg = 'Poor';
//           break;
//         case 2:
//           this.msg = 'Not Good';
//           break;
//         case 3:
//           this.msg = 'Average';
//           break;
//       }
//     } else {
//       this.msg = '';
//     }
//   }

//   private getColor(s: number) {
//     let idx = 0;
//     if (s <= 10) {
//       idx = 0;
//     } else if (s <= 20) {
//       idx = 1;
//     } else if (s <= 30) {
//       idx = 2;
//     } else if (s <= 40) {
//       idx = 3;
//     }
//     return {
//       idx: idx + 1,
//       col: this.colors[idx],
//     };
//   }

//   private setBarColors(count: number, col: string) {
//     for (let n = 0; n < count; n++) {
//       this['bar' + n] = col;
//     }
//   }
// }
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
  [key: string]: any;
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
