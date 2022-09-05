import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainviewComponent } from './mainview/mainview.component';   

import { DefaultModule } from './default/default.module';
import { ImagesComponent } from './images/images.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent, 
    MainviewComponent,
    ImagesComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    DefaultModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
