import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators,FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:UntypedFormGroup;
  submitted = false;
  error='';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService:AuthenticationService,
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
  });
  }

  ngOnInit(): void {

  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.f['email'].value);
    console.log(this.f['password'].value);

    this.authenticationService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (responce)=>{
          console.log(responce)
          //il y a une url demandée dans les paramètres de route, prendre celle-ci sinon on redirige vers admin
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
          this.router.navigate([returnUrl]);
        },
        error: error=> {
          console.log(error)
          this.error="Erreur d'authentification : " + error.message;
        }
      });


  }

}
