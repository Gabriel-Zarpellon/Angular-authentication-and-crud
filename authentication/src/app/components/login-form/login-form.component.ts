import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { tUserLogin } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(private userService: UserService) {}

  loginForm = new FormGroup({
    email: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null),
  });

  submit() {
    const data = this.loginForm.value as tUserLogin;
    this.userService.login(data);
  }
}
