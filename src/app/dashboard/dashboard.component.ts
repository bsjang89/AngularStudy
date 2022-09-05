import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  position: number;
  filename: string;
  labeled: string;
  time: string;
  img: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, filename: 'image_01', labeled: "labeled", time: '1:30', img: "https://material.angular.io/assets/img/examples/shiba1.jpg" }, 
  { position: 2, filename: 'image_02', labeled: "labeled", time: '1:00', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 3, filename: 'image_03', labeled: "labeled", time: '1:15', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 4, filename: 'image_04', labeled: "labeled", time: '1:40', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 5, filename: 'image_05', labeled: "labeled", time: '2:30', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 6, filename: 'image_06', labeled: "labeled", time: '3:30', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 7, filename: 'image_07', labeled: "labeled", time: '4:30', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 8, filename: 'image_08', labeled: "labeled", time: '5:30', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 9, filename: 'image_09', labeled: "labeled", time: '2:30', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 10, filename: 'image_10', labeled: "labeled", time: '1:10', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 11, filename: 'image_11', labeled: "labeled", time: '1:12', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 12, filename: 'image_12', labeled: "labeled", time: '1:45', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 13, filename: 'image_13', labeled: "labeled", time: '1:55', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 14, filename: 'image_14', labeled: "labeled", time: '1:10', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
  { position: 15, filename: 'image_15', labeled: "labeled", time: '1:50', img: "https://material.angular.io/assets/img/examples/shiba1.jpg"  }, 
  { position: 16, filename: 'image_16', labeled: "labeled", time: '1:15', img: "https://material.angular.io/assets/img/examples/shiba2.jpg"  }, 
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'img'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.bigChart = this.dashboardService.bigChart(); 

    this.dataSource.paginator = this.paginator;
  }

}
