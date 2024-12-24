import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environment/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  login() {

  }
  async register(body: any): Promise<Observable<any>> {
    console.log(body);
    const result= await this.http.post(`${this.apiUrl}/register`, body);
    console.log(result);
    return result;
    // return this.http.post(`${this.apiUrl}/register`, body);
  }
}
