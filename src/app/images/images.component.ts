import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  constructor() { }

  files:any;
  imgSrc:any;
  ngOnInit(): void { 
    this.imgSrc = document.getElementById("image-show");
  }

  loadfiles(event) {
    console.log(event.target.files);
    this.files = event.target.files; 
    for(var i=0; i<this.files.length;i++)
    {
      this.loadImage(i);
    }
  }


  loadImage(index) {
    var file = this.files[index]; 
    var img = this.createImage(file); 
    this.imgSrc.appendChild(img); 
  }

  createImage(filepath) { 
    var newDiv = document.createElement("div");
    var name = document.createElement("p");
    name.appendChild(document.createTextNode(filepath.name));
    
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    newImage.src = URL.createObjectURL(filepath);
    newImage.style.width = "200px";
    newImage.style.height = "200px";
    newImage.style.objectFit = "contain"; 
    newImage.style.margin = "5px";
    newDiv.appendChild(name);
    newDiv.appendChild(newImage);
    return newDiv;
  }
}
