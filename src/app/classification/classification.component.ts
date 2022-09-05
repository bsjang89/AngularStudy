import {
  Component, 
  OnInit,
  ViewChild,
  Output, EventEmitter
} from '@angular/core';

//ImageInfo
class ImageInfo {
  index: number;
  class: any;
  file: any;
  constructor(_filepath: string) {
    this.file = _filepath;
    this.class = 0;
  }
}

class Class {
  index = 0;
  name: string;
  constructor(_index: number, _name: string) {
    this.index = _index;
    this.name = _name;
  }
}

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  @ViewChild('classesContent', {
    static: true
  })
  public classesContent: any;

  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    console.log(value);
  }

  constructor() {}

  imgSrc: any;
  curFileName: any;
  classes: any;
  curLabeledCount: any;

  ngOnInit(): void {
    this.imgSrc = document.getElementById("image-show");
    this.curFileName = document.getElementById('fileName');
    this.classes = document.querySelector('#classes');
    this.curLabeledCount = document.getElementById('labeledcount');
  }

  txclassName = "";
  //imgSrc:any;

  classList = [];
  arrImageInfo = [];


  onAddClass(event ? : MouseEvent) {
    console.log("click");

    if (this.txclassName.length <= 0) {
      alert("Please input class name");
      return;
    }

    if (this.classList.filter(s => s.name == this.txclassName).length > 0) {
      alert("Already exist class name.");
      return;
    }
    this.classList.push(new Class(this.classList.length + 1, this.txclassName));
    //this.classesContent += this.newClass(this.txclassName);
    this.classesContent.nativeElement.appendChild(this.newClass(this.txclassName));

    console.log(this.classesContent);
    this.txclassName = "";
  }

  onDelClass(event ? : MouseEvent) {
    if (this.classesContent.length == 0) {
      alert("Not exist class infomation");
      return;
    } else {
      var checked = document.querySelectorAll('input[class=testinput]:checked');
      if (checked.length > 0) {
        console.log(checked[0].id);
        var d = this.arrImageInfo.filter(s => s.class.name == checked[0].id);
        if (d.length > 0) {
          if (confirm("This class already assigned for image. are you sure remove this class?")) {
            const c = this.classList.findIndex(s => s.name == checked[0].id);
            this.classList.splice(c, 1);
            this.classes.removeChild(checked[0].parentNode);
            // for (var v of d) {
            //   v.class = new Class();
            // }
            for (var i = 0; i < this.classList.length; i++) {
              this.classList[i].index = i;
            }
            console.log(d);
            this.curLabeledCount.textContent = this.getLabeledCount();
          } else {
            return;
          }
        } else {
          const c = this.classList.findIndex(s => s.name == checked[0].id);
          this.classList.splice(c, 1);
          this.classes.removeChild(checked[0].parentNode);
          for (var i = 0; i < this.classList.length; i++) {
            this.classList[i].index = i;
          }
          this.curLabeledCount.textContent = this.getLabeledCount();
        }
      } else
        console.log("없음");
    }
  }

  newElem: any;
  // newClass(name : string) {
  //   this.newElem = document.createElement("mat-button"); 
  //   //this.newElem.setAttribute('value',name); 
  //   this.newElem.appendChild(document.createTextNode(name));
  //   console.log("test:",this.newElem);
  //   return this.newElem;
  // }


  createImage(filepath) {
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    newImage.src = URL.createObjectURL(filepath);
    newImage.style.width = "100%";
    newImage.style.height = "100%";
    newImage.style.objectFit = "contain";
    return newImage;
  }

  loadImage(index) {
    var file = this.files[this.curIdx];
    //var imgSrc = document.getElementById("image-show");
    console.log("imgSrc:", this.imgSrc);
    var img = this.createImage(file);
    if (this.imgSrc.firstChild != null)
      this.imgSrc.removeChild(this.imgSrc.firstChild);
    this.imgSrc.appendChild(img);
    this.curLabeledCount.textContent = this.getLabeledCount();
  }

  loadfiles(event) {
    console.log(event.target.files);
    this.files = event.target.files;
    this.curIdx = 0;
    this.arrImageInfo.splice(0, this.arrImageInfo.length)
    for (var file of this.files) {
      this.arrImageInfo.push(new ImageInfo(file));
      this.addNewItem(file);
    }
    //files = getShuffledArray(files); //sort by rand order
    this.loadImage(this.curIdx);
  }

  newClass(name: string) {
    this.newElem = document.createElement("div");
    let html = '';
    //html += '<div>';
    html += '<input type="radio" class="testinput" name="classes" id="';
    html += name + '" value="' + name + '">';
    html += '<label for="';
    html += name + '">';
    html += name;
    html += '</label>';
    //html += '</div>';
    this.newElem.innerHTML = html;
    return this.newElem;
  }

  onMouseLeave(event ? : MouseEvent) {
    this.panning = false;
    console.log("leave");
  }
  onMouseDown(event ? : MouseEvent) {
    console.log("mousedown");
    event.preventDefault();
    this.start = {
      x: event.clientX - this.pointX,
      y: event.clientY - this.pointY
    };
    this.panning = true;
  }
  onMouseUp(event ? : MouseEvent) {
    console.log("mouseup");
    this.panning = false;
  }
  onMouseover(event ? : MouseEvent) {
    //console.log("mouseover");
    event.preventDefault();
    if (!this.panning) {
      return;
    }
    this.pointX = (event.clientX - this.start.x);
    this.pointY = (event.clientY - this.start.y);
    this.setTransform();
  }

  onWheel(e) {
    e.preventDefault();
    var xs = (e.clientX - this.pointX) / this.scale,
      ys = (e.clientY - this.pointY) / this.scale,
      delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (this.scale *= 1.2) : (this.scale /= 1.2);
    this.pointX = e.clientX - xs * this.scale;
    this.pointY = e.clientY - ys * this.scale;

    this.setTransform();
  }

  //Image
  scale = 1;
  panning = false;
  pointX = 0;
  pointY = 0;
  start = {
    x: 0,
    y: 0
  };

  curIdx = 0;
  files: any;
  filelist: any;


  reset() {
    this.start.x = 0;
    this.start.y = 0;
    this.pointX = 0;
    this.pointY = 0;
    this.scale = 1;
  }
  onZoomFit(event ? : MouseEvent) {
    this.reset();
    this.imgSrc.style.transform = null;
  }
  onZoomIn(e) {
    this.scale *= 1.1;
    this.start.x = 0;
    this.start.y = 0;
    this.setScale();
  }
  onZoomOut(e) {
    this.scale /= 1.1;
    this.start.x = 0;
    this.start.y = 0;
    this.setScale();
  }
  setTransform() {
    this.imgSrc.style.transform = "translate(" + this.pointX + "px, " + this.pointY + "px) scale(" + this.scale + ")";
  }
  setScale() {
    this.imgSrc.style.transform = "scale(" + this.scale + ")";
  }



  onPrevImage() {
    if (this.files != null) {
      if (this.curIdx == 0) return;
      this.curIdx--;
      this.loadImage(this.curIdx);
      this.onZoomFit();
      if (this.isHasClass())
        this.setCheck(this.arrImageInfo[this.curIdx].class);
      else
        this.resetCheck();
    }
  }

  onNextImage() {
    if (this.files != null) {
      if (this.curIdx + 1 == this.files.length) return;
      this.curIdx++;
      this.loadImage(this.curIdx);
      this.onZoomFit();
      if (this.isHasClass())
        this.setCheck(this.arrImageInfo[this.curIdx].class);
      else
        this.resetCheck();
    }
  }




  // //Main
  // var btnprev = document.getElementById('btn-prev');
  // btnprev.onclick = prevImage;
  // var btnnext = document.getElementById('btn-next');
  // btnnext.onclick = nextImage;


  // const arrclass = new Array();
  // const arrImageInfo = new Array();

  // document.addEventListener("keydown", function (event :any) {
  //   if (event.key >= 1 && event.key <= 9) {
  //     if (isValid(event.key))
  //       setCheckbyIdx(event.key);
  //   } else if (event.key == "Escape") {
  //     resetCheck();
  //   } else if ((event.key == "B" || event.key == "b") && event.ctrlKey == true) {
  //     if (IsChecked()) {
  //       saveLabel();
  //       nextImage();
  //       console.log(event);
  //     }
  //   } else if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
  //     switch (event.key) {
  //       case "ArrowLeft":
  //         prevImage();
  //         break;
  //       case "ArrowRight":
  //         nextImage();
  //         break;
  //     }
  //   }
  // });

  makeJson() {
    var json = new Array();

    for (var i = 0; i < this.arrImageInfo.length; i++) {
      var data = new ImageInfo("");
      data.index = i;
      data.file = this.arrImageInfo[i].file.name;

      if (this.arrImageInfo[i].class != null) {
        data.class = new Class(this.arrImageInfo[i].class.index, this.arrImageInfo[i].class.name);
      }
      json.push(data);
    }
    var jsonData = JSON.stringify(json, null, 2);
    let today = this.toStringByFormatting(new Date());
    var fname = today;
    this.download(jsonData, fname, 'text/plain');
  }


  onSubmit(e) {
    this.saveLabel();
    this.onNextImage();
    this.curLabeledCount.textContent = this.getLabeledCount();
  }
  onSkip(e) {
    this.resetCheck();
    this.arrImageInfo[this.curIdx].class = new Class(0, "");
    this.curLabeledCount.textContent = this.getLabeledCount();
  }
  onExport() {
    this.makeJson();
  }


  resetCheck() {
    if (this.classes != null) {
      for (var value of this.classes.children as any) {
        value.firstChild.checked = false;
      }
    }
  }



  isHasClass() {
    if (this.arrImageInfo[this.curIdx].class != null)
      return true;
    else
      return false;
  }

  setCheck(c) {
    if (this.classes != null) {
      this.resetCheck();
      for (var value of this.classes.children as any) {
        if (value.firstChild.id == c.name) {
          value.firstChild.checked = true;
          console.log(value.firstChild.id, c.name);
        }
      }
    }
  }

  isValid(idx) {
    if (idx - 1 < this.classes.children.length)
      return true;
    else
      return false;
  }

  setCheckbyIdx(idx) {
    if (this.classes != null) {
      this.resetCheck();
      console.log(idx);
      (this.classes.children[idx - 1].firstChild as any).checked = true;
      console.log(this.classes);
    }
  }

  IsChecked() {
    var checked = document.querySelectorAll('input[class=testinput]:checked');
    if (checked.length > 0)
      return true;
  }

  saveLabel() {
    var checked = document.querySelectorAll('input[class=testinput]:checked');
    if (checked.length > 0) {
      const idx = this.classList.findIndex(s => s.name == checked[0].id);
      this.arrImageInfo[this.curIdx].class = this.classList[idx];
      //console.log(idx,curIdx, arrImageInfo[curIdx]); 
    }
  }


  getLabeledCount() {
    var cnt = 0;
    var defaultval = new Class(0, "");
    for (var i = 0; i < this.arrImageInfo.length; i++) {
      if (this.arrImageInfo[i].class.name != undefined) {
        cnt++;
      }
    }
    //var v = arrImageInfo.filter(s=>s.class.name != '')
    console.log(cnt);
    var curLabels = "( " + cnt + " / " + this.arrImageInfo.length + " )";
    return curLabels;
    //curLabeledCount
  }





  // //Util

  leftPad(value) {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  }

  toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = this.leftPad(source.getMonth() + 1);
    const day = this.leftPad(source.getDate());
    const hour = this.leftPad(source.getHours());
    const minutes = this.leftPad(source.getMinutes());
    const seconds = this.leftPad(source.getSeconds());
    return [year, month, day, hour, minutes, seconds].join(delimiter);
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {
      type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
