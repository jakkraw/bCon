import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderListsComponent } from './components/order-lists/order-lists.component';
import { AppRoutingModule } from './app-routing.module';
import { ServerConnectionService } from './server-connection/server-connection.service';
import { HttpModule } from '@angular/http';
import { OrderComponent } from './components/order-lists/order/order.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginService } from './login/login.service';
import { LoggedGuard } from './login/logged.guard';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './components/order-lists/order/item/item.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListsComponent,
    OrderComponent,
    LoginFormComponent,
    ItemComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ ServerConnectionService, LoginService, LoggedGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
