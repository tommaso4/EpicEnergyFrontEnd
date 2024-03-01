import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../model/iuser';
import { Observable } from 'rxjs';
import { ILogin } from '../model/ilogin';

@Injectable({
  providedIn: 'root'
})
export class LogSystemService {


  constructor(
    public http: HttpClient
  ) { }

  register(user: IUser):Observable<Object>{
    return this.http.post<Object>('http://localhost:8080/auth/register',user)
  }

  login(user:ILogin) :Observable<Object>{
    return this.http.post<Object>('http://localhost:8080/auth/login', user)
  }

}
