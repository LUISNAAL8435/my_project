import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {
private baseUrl = environment.apiBaseUrl;
  constructor(protected http: HttpClient) { }

  create<T>(endpoint:string,data:T):Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/${endpoint}/`,data);
  }
    getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}/`);
  }
    getById<T>(endpoint: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
    // 🔹 Actualizar un registro
  update<T>(endpoint: string, id: number | string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data);
  }
    delete<T>(endpoint: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
