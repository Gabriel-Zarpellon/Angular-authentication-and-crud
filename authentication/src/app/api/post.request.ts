import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPost, tCreatePost, tUpdatePost } from '../interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostRequest {
  private BASE_URL = 'https://blog-fake-api.onrender.com';

  constructor(private http: HttpClient) {}

  create(data: tCreatePost) {
    const token = localStorage.getItem('@TOKEN');

    if (token) {
      const parsedToken = JSON.parse(token);

      return this.http.post(`${this.BASE_URL}/news`, data, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    }
    return null;
  }

  getPosts() {
    return this.http.get(`${this.BASE_URL}/news`);
  }

  update(id: number, data: tUpdatePost) {
    const token = localStorage.getItem('@TOKEN');

    if (token) {
      const parsedToken = JSON.parse(token);

      return this.http.patch<iPost>(`${this.BASE_URL}/news/${id}`, data, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    }
    return null;
  }

  delete(id: number) {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      const parsedToken = JSON.parse(token);

      return this.http.delete(`${this.BASE_URL}/news/${id}`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    }
    return null;
  }
}
