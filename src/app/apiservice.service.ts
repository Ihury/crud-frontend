import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  // connect frontend to backend

  apiUrl = 'http://localhost:8080/';

  getUser(id: string): Observable<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('userAccessToken')
    );
    return this._http.get(this.apiUrl + 'usuarios?id=' + id, { headers });
  }

  // get all users
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('userAccessToken')
    );
    return this._http.get(this.apiUrl + 'usuarios', { headers });
  }

  // create a new user
  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('userAccessToken')
    );
    return this._http.post(
      this.apiUrl + 'usuarios/create',
      user,
      { headers }
    );
  }

  // update a user
  updateUser(id: number, user: any): Observable<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('userAccessToken')
    );
    return this._http.put(
      this.apiUrl + 'usuarios/update',
      { id, user },
      { headers }
    );
  }

  // delete a user
  deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('userAccessToken')
    );
    return this._http.delete(this.apiUrl + 'usuarios/delete/', {
      body: { id },
      headers,
    });
  }

  // login as admin
  login(user: any): Observable<any> {
    return this._http.post(this.apiUrl + 'admin/login', user);
  }
}
