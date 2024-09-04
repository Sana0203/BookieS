import { Routes } from '@angular/router';
import { SigninComponent } from './+pages/+public/signin/signin.component';
import { SignupComponent } from './+pages/+public/signup/signup.component';
import { NavComponent } from './+pages/+public/nav/nav.component';
import { PrivateNavComponent } from './+pages/+private/private-nav/private-nav.component';
import { HomeComponent } from './+pages/+private/home/home.component';
import { privateGuard } from './+guards/private.guard';

export const routes: Routes = [
    {path:'', component:NavComponent, children:[
        {path:'signin', component:SigninComponent},
        {path:'signup', component:SignupComponent},
        {path:'', redirectTo:'signin', pathMatch:'prefix'}
    ]},
    {path:'private', canActivate:[privateGuard], component:PrivateNavComponent, children:[
        {path:'home', component:HomeComponent},
        {path:'', redirectTo:'home', pathMatch:'prefix'}
    ]},
    {path:'', redirectTo:'', pathMatch:'full'}
    
];
