import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenSvcService } from './token-svc.service';
import { Observable } from 'rxjs';
import { ICompanies } from '../model/ICompanies';

@Injectable({
  providedIn: 'root'
})
export class CompaniesSvcService {
  constructor(
    private http: HttpClient,
    private tokenSvc: TokenSvcService
  ) { }

  getAllCompanies(): Observable<Object[]>{
    const token:string | null = this.tokenSvc.getToken();
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get<Object[]>('http://localhost:8080/cliente',{headers})
    }else{
      console.log("error with token")
      return  new Observable<Object[]>();
    }
  }
}
