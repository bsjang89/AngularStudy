import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  imageList = [];

  constructor() { }

  ngOnInit(): void {
  }


  addItem(event)
  {
    console.log("We");
  }
}
