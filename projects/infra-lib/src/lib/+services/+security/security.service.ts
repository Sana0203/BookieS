import { inject, Injectable } from '@angular/core';
import { Result, SigninModel, SignupModel, User, UserToken } from '../../../../../core-lib/src/public-api';
import { delay, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private users:User[]=[];
  private router = inject(Router);
  private load(){
    this.users = JSON.parse(localStorage.getItem('users')??'[]');
  }

  private save(){
    localStorage.setItem('users',JSON.stringify(this.users));
  }

  signup(signupData:SignupModel):Observable<Result>{
    this.load();
    const signupResult:Result={
      message:'',
      success:false
    };
    if (signupData.password != signupData.passwordConfirmation) {

        return throwError("Passwords do not match");

    }
    const result = this.users.filter(m => m.email==signupData.email || m.phone == signupData.phone);
    if (result && result.length>0) {
      signupResult.message = "Email address or phone number is already registered!"
    }else{
      signupResult.message = "You signed up successfully.";
      signupResult.success = true;
      this.users.push(signupData);
      this.save();
      this.setToken(signupData,false);
    }
    return of(signupResult);
  }

  signin(signinData:SigninModel):Observable<Result>{
    this.load();
    if (!signinData.email || signinData.email == "") {
      throw "Please enter your email"
    }
    if (!signinData.password || signinData.password == "") {
      throw "Please enter your password"
    }
    const signinResult:Result={
      message:'',
      success:false
    };
    const result = this.users.filter(m => m.email==signinData.email && m.password == m.password);
    if(result && result.length>0){
      signinResult.message='successfull';
      signinResult.success=true;
      this.setToken(result[0],signinData.rememberMe);
    }else{
      signinResult.message="Invalid email or password";
    }
    return of(signinResult).pipe(delay(2000));

  }

  signout(){
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
    }
    this.router.navigateByUrl('/');
  }

  setToken(user:UserToken, rememberMe:boolean){
    if (rememberMe) {
      sessionStorage.setItem('token',JSON.stringify(user));
    }
    localStorage.setItem('token',JSON.stringify(user));
  }

  getInfo(){
    let token: UserToken;
    if (localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token')??'');
    }else{
      token = JSON.parse(sessionStorage.getItem('token')??'');
    }
    return token;
  }

  canAccess():Observable<boolean>{
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      //check token with backend
      return of(true).pipe(delay(2000));
    }
    return of(false).pipe(delay(2000));
  }

}
