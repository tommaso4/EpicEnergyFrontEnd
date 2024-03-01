import { ILogin } from './../../model/ilogin';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { LogSystemService } from '../../service/log-system.service';
import { TokenSvcService } from '../../service/token-svc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  pswRegex: string = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$';
  errString!: string;
  notLogged: boolean = false;

  constructor(
    private fb: FormBuilder,
    private LS: LogSystemService,
    private tokenSvc: TokenSvcService,
    private router: Router
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      username: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required, Validators.pattern(this.pswRegex)])
    })
  }
  submit() {
    const user: ILogin = this.login.value;
    this.LS.login(user).subscribe(
      (res:any) => {
        const token: string = this.takeToken(res)
        this.tokenSvc.setToken(token)
        const str : string | null = this.tokenSvc.getToken();
        this.router.navigate(['/companies'])
      },
      error => {
        this.notLogged = true;
        this.errString = error.error.message;
      }
    )
    this.login.reset();
  }

  takeToken(res: any): string {
    return res.message;
  }

  isTouched(tipo: string): boolean | undefined {
    return this.login.get(tipo)?.touched;
  }
  isValid(tipo: string): boolean | undefined {
    return this.login.get(tipo)?.valid
  }
  validAndTouched(tipo: string): boolean | undefined {
    return this.isTouched(tipo) && !this.isValid(tipo);
  }


}
