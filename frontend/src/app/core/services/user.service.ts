import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(delay = 0) {
    return this.http.get(`${this.apiUrl}?delay=${delay}`);
  }

  createUser(payload) {
    return this.http.post(this.apiUrl, payload);
  }

  deleteUser(userId) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}