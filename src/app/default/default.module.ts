import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
//import { PostsComponent } from 'src/app/modules/posts/posts.component';
//import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { DashboardService } from 'src/app/dashboard.service';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';  

import { ClassificationComponent } from '../classification/classification.component';
import {SegmentationComponent} from '../segmentation/segmentation.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    //PostsComponent
    ClassificationComponent, 
    SegmentationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
