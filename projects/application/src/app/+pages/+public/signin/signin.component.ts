import { Component, inject } from '@angular/core';
import { Result, SigninModel } from '../../../../../../core-lib/src/public-api';
import { Observable, of } from 'rxjs';
import { SecurityService } from '../../../../../../infra-lib/src/lib/+services/+security/security.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  
  router = inject(Router);
  securityService=inject(SecurityService);
  result$:Observable<Result>|undefined;
  loading:boolean = false;

  signinClick() {
    if (this.signinForm.controls.email.value  != '' &&
          this.signinForm.controls.password.value !='') {
    this.loading = true;
    this.result$=this.securityService.signin({
      email:this.signinForm.controls.email.value??'',
      password:this.signinForm.controls.password.value??'',
      rememberMe:this.signinForm.controls.rememberMe.value??false,
    });
    this.result$.subscribe(res=>{
      this.loading = false;
      if (res.success) {
        this.router.navigateByUrl('/private/home');
      }
    });

    }else{
      const result:Result={
        message:"Please put your email and your password.",
        success:false
      }
      this.result$ = of(result);
    }
  }
  fb = inject(FormBuilder);
  signinForm=this.fb.group({
    email: [''],
    password: [''],
    rememberMe: []
  });

  // signinData: SigninModel = {
  //   email: '',
  //   password: '',
  //   rememberMe: false
  // };
}
