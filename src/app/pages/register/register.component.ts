import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogSystemService } from '../../service/log-system.service';
import { IUser } from '../../model/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  form! : FormGroup;
  emailExist: boolean = false;
  pswRegex: string = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$';
  constructor(
    private fb: FormBuilder,
    private LS: LogSystemService,
    private router: Router
    ) { }
    ngOnInit() :void{

      this.form = this.fb.group({
        nome: this.fb.control(null,[Validators.required]),
        cognome: this.fb.control(null,[Validators.required]),
        username: this.fb.control(null,[Validators.required]),
        email: this.fb.control(null,[Validators.required,Validators.email]),
        password1: this.fb.control(null,[Validators.required, Validators.pattern(this.pswRegex)]),
        password: this.fb.control(null,[Validators.required, this.passwordMatchValidator] as Validators)
      })

    }

    submit(){
        delete this.form.value.password1;
        const user: IUser = this.form.value;
        this.LS.register(user).subscribe(
          response => {
            console.log('Registrazione avvenuta con successo', response);
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Errore durante la registrazione', error);
          }
        );
    }

    isValid(nameForm:string):boolean|undefined{
      return this.form.get(nameForm)?.valid
    }
    isTouched(nameForm:string):boolean|undefined{
      return this.form.get(nameForm)?.touched
    }
    isValidAndTouched(nameForm:string):boolean|undefined{
      return !this.isValid(nameForm) && this.isTouched(nameForm)
    }

    passwordMatchValidator = (formC: FormControl):ValidationErrors|null => {
      if(formC.value != this.form?.get('password1')?.value){
        return{
          invalid : true,
          message: 'Password do not match'
        }
      }
      return null;
    }
    getCustomMessage(nameForm:string){
      return this.form.get(nameForm)?.errors!['message']
    }
}
