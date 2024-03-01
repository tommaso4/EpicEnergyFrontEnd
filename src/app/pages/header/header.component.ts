import { TokenSvcService } from './../../service/token-svc.service';
import { Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LogSystemService } from '../../service/log-system.service';
import { log } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  isLogged: boolean = false;

  constructor(
    private LS: LogSystemService,
    private TokenSvc :TokenSvcService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.checkToken();
    console.log(this.isLogged)
  }

  checkToken(): boolean {
      let token: string | null = this.TokenSvc.getToken();
      console.log(token)
      if (token) {
        return true;
      }
      return false;
  }

  logOut(): void {
    this.LS.logout();
    this.isLogged = false;
  }
}
