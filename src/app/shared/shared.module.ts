import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';   

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HighchartsChartModule } from 'highcharts-angular';
import { HeaderComponent} from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'; 
import { AreaComponent } from './components/area/area.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent, 
    AreaComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule
  ],
  exports: [ 
    HeaderComponent,
    SidebarComponent,
    AreaComponent,
  ]
})
export class SharedModule { }
