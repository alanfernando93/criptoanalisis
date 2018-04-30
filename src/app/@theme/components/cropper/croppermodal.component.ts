import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
  selector: 'ngbd-modal-content',
  template: `
      <div class="modal-header">
        <h4 class="modal-title">Seleccione una Imagen</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="file-upload">
          <div class="row justify-content-center">
            <div class="col-7">
              <input id="custom-input" type="file" name="file-1[]" id="file-1" class="inputfile inputfile-1" data-multiple-caption="{count} files selected"
                  multiple="" (change)="fileChangeListener($event)">
              <label for="file-1">
                <svg xmlns="#" width="20" height="17" viewBox="0 0 20 17">
                  <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                </svg>
                <span>Choose a file…</span>
              </label>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12">
            <img-cropper id="cropper" #cropper [image]="data" [settings]="cropperSettings"></img-cropper>
          </div>
        </div>
        <br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Insertar</button>
      </div>`,
})
export class CropperModalComponent {
  @Input() name;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  data: any;

  croppedWidth: number;
  croppedHeight: number;

  constructor(public activeModal: NgbActiveModal) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = 200;
    this.cropperSettings.height = 150;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.preserveSize = true;

    this.data = {};
  }

  fileChangeListener($event) {
    var type: any = new Array("image/jpeg", "image/jpg", "image/png", "image/bmp");
    var maximo = 5500000; //4.8 Mb esto es para probar 
    //max y min 
    var image: any = new Image();
    var file: File = $event.target.files[0];
    console.log(file);
    var myReader: FileReader = new FileReader();
    if (type.find(element => element === file.type) === undefined) return;

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      console.log(image.height + 'px X ' + image.width + "px");
      this.cropper.setImage(image);

    };
    myReader.readAsDataURL(file);
  }

  getImageResize() {
    return this.data.image;
  }

  getImageFile() {
    return this.b64toFile(this.data.image);
  }

  b64toFile(dataURI): File {
    // convert the data URL to a byte string
    const byteString = atob(dataURI.split(',')[1]);

    // pull out the mime type from the data URL
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // Convert to byte array
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob that looks like a file.
    const blob = new Blob([ab], { 'type': mimeString });
    blob['lastModifiedDate'] = (new Date()).toISOString();
    blob['name'] = 'file';

    // Figure out what extension the file should have
    switch (blob.type) {
      case 'image/jpeg':
        blob['name'] += '.jpg';
        break;
      case 'image/png':
        blob['name'] += '.png';
        break;
    }
    // cast to a File
    return <File>blob;
  }
}