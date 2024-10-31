import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  iUserLoginReturn,
  iUserRegisterReturn,
  tUserLogin,
  tUserRegister,
  tUserReturn,
} from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserRequest {
  private BASE_URL = 'https://blog-fake-api.onrender.com';

  constructor(private http: HttpClient) {}

  register(formData: tUserRegister) {
    return this.http.post<iUserRegisterReturn>(
      `${this.BASE_URL}/users`,
      formData
    );
  }

  login(formData: tUserLogin) {
    return this.http.post<iUserLoginReturn>(`${this.BASE_URL}/login`, formData);
  }

  getUser() {
    const token = localStorage.getItem('@TOKEN');
    const userId = localStorage.getItem('@USERID');

    if (token && userId) {
      const parsedToken = JSON.parse(token);
      const parsedUserId = JSON.parse(userId);

      return this.http.get<tUserReturn>(
        `${this.BASE_URL}/users/${parsedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
    }
    return null;
  }
}
