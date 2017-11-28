import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { OrderListsComponent } from './components/order-lists/order-lists.component';
import { LoggedGuard } from './login/logged.guard'
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainComponent } from './components/main/main.component';
import {MenuComponent} from "./components/menu/menu.component";

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
        redirectTo: 'orders',
        pathMatch: 'prefix'
      },
      {
        path: 'orders',
        component: OrderListsComponent
      },
      {
        path: 'tables',
        component: OrderListsComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      }
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
