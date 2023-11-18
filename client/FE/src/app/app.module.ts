import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DashComponent } from './dash/dash.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DashComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
