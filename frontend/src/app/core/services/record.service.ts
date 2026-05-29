import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecordService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRecords(delay = 2000) {
    const headers = new HttpHeaders({ 'X-Skip-Loader': 'true' });
    return this.http.get(`${this.apiUrl}/records?delay=${delay}`, { headers });
  }
}