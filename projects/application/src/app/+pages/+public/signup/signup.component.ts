import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecurityService } from '../../../../../../infra-lib/src/lib/+services/+security/security.service';
import { catchError, Observable, of } from 'rxjs';
import { Result } from '../../../../../../core-lib/src/public-api';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  fb = inject(FormBuilder);
  router=inject(Router);
  securityService= inject(SecurityService);
  result$:Observable<Result>|undefined;

  signupClick() {
    // try {
      // console.log(this.signupForm.controls);
      const result:Result={
        message:'',
        success:false
      }
      this.result$ = this.securityService.signup({
      name:this.signupForm.controls.name.value??'',
      email:this.signupForm.controls.email.value??'',
      phone:this.signupForm.controls.phone.value??'',
      password:this.signupForm.controls.password.value??'',
      passwordConfirmation:this.signupForm.controls.passwordConfirmation.value??'',
    }).pipe(
      catchError(err => {
        const result:Result={
              message:err.toString(),
              success:false
            }
        return this.result$ = of(result);
      })
    );
    this.result$.subscribe(res=>{
      if (res.success) {
        this.router.navigateByUrl('/private/home');
      }
    });

  }

  signupForm=this.fb.group({
    email: [''],
    name: [''],
    phone: [''],
    password: [''],
    passwordConfirmation: ['']
  });

}
