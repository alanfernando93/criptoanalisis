import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropperComponent } from '../cropper/cropper.component';

@Component({
  selector: 'ngx-image',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  @Output() onImageSelected = new EventEmitter<any>();

  myFile: any;
  url: any = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
  constructor(private modalService: NgbModal) { }

  openCropper() {
    const modalRef = this.modalService.open(CropperComponent);
    const instance = modalRef.componentInstance;
    modalRef.result.then(result => {
      if (instance.getImageResize()) {
        this.url = instance.getImageResize();
        this.myFile = instance.getImageFile();
        this.onImageSelected.emit(this.myFile);
      }
    }, reason => {
    })
  }
}
