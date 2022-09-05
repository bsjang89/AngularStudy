import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent  } from './dashboard/dashboard.component';
import { SegmentationComponent } from './segmentation/segmentation.component';
import { ClassificationComponent } from './classification/classification.component';
import { ImagesComponent } from './images/images.component';
//import { PostsComponent } from './modules/posts/posts.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  },{
    path: 'classification',
    component: ClassificationComponent
  },{
    path: 'segmentation',
    component: SegmentationComponent
  },{
    path: 'image',
    component: ImagesComponent
  }]
  
  //}, {
  //   path: 'posts',
  //   component: PostsComponent
  // }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
