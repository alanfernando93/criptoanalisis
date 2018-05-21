import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperModalComponent } from '../cropper/croppermodal.component';

@Component({
  selector: 'ngx-image',
  template: `
  <div class="row">
    <div class="col align-self-start">
      <label>Imagen pricipal</label>
    </div>
  </div>
  <div class="row">
    <div class="col align-self-center">
      <input type="button" name="file-5" id="file-5" class="inputfile inputfile-5" data-multiple-caption="{count} archivos seleccionados"
        (click)="openCropper()" multiple />
      <label for="file-5">
        <img [src]="url" class="img-fluid" id="image">
        <div class="text-center">
          <a class="iborrainputfile btn btn-success">Seleccionar archivo</a>
        </div>
      </label>
    </div>
  </div>
  `,
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Output() onImageSelected = new EventEmitter<any>();

  myFile: any;
  url: any = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
  constructor(private modalService: NgbModal) { }

  openCropper() {
    const modalRef = this.modalService.open(CropperModalComponent);
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
