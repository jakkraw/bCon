import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { OrderListsComponent } from './components/order-lists/order-lists.component';
import { LoggedGuard } from './login/logged.guard'
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginFormComponent 
  },
  {
    path: '',
    canActivate: [ LoggedGuard ],
    component: MainComponent,
    children: [
      { 
        path: '', 
        component: OrderListsComponent 
      },
    ]
  },
  
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
