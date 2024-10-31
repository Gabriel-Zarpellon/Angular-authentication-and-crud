import { Injectable, signal } from '@angular/core';
import {
  tUserLogin,
  tUserRegister,
  tUserReturn,
} from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { publicRoutes } from '../app.routes';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRequest } from '../api/user.request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly userSignal = signal<tUserReturn | null>(null);

  constructor(private userRequest: UserRequest, private router: Router) {
    const pathname = window.location.pathname;

    this.userRequest.getUser()?.subscribe({
      next: (data) => {
        this.userSignal.set(data);
        if (publicRoutes.includes(pathname)) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl(pathname);
        }
      },
      error: (error) => {
        console.log(error);
        this.logout();
      },
    });
  }

  register(formData: tUserRegister) {
    this.userRequest.register(formData).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error === 'Email already exists') {
            alert('Usuário já cadastrado no sistema');
          }
        }
      },
    });
  }

  login(formData: tUserLogin) {
    this.userRequest.login(formData).subscribe({
      next: (data) => {
        this.userSignal.set(data.user);
        localStorage.setItem('@TOKEN', JSON.stringify(data.accessToken));
        localStorage.setItem('@USERID', JSON.stringify(data.user.id));

        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');

    this.router.navigateByUrl('/');
  }

  getUser() {
    return this.userSignal();
  }
}
