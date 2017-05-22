import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SpeciesComponent } from './species/species.component';
import { AnimalComponent } from './animals/animal.component';

import { LoginRegisterComponent } from './login-register/login-register.component'
import { AuthGuard } from '../_guards/auth.guard';

export const MODULE_ROUTES: Route[] =[
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'species', component: SpeciesComponent },
    { path: 'animals', component: AnimalComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    HomeComponent,
    LoginRegisterComponent,
    UserComponent,
    AnimalComponent,
    SpeciesComponent
]
