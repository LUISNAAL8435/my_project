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
}
