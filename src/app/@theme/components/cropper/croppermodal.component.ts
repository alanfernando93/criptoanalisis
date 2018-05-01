import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';

import { parseToFile, showToast } from '../../../common/functions';
import { configImage} from '../../../common/ConfigSettings';

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
        
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-11">
              <img-cropper id="cropper" #cropper [image]="data" [settings]="cropperSettings"></img-cropper>
            </div>
          </div>
        </div>
        <br>
      </div>
      <div class="modal-footer">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-8">
              <input id="custom-input" type="file" name="file-1[]" id="file-1" class="inputfile inputfile-1" data-multiple-caption="{count} files selected"
                  multiple="" (change)="fileChangeListener($event)">
              <label for="file-1">
                <svg xmlns="#" width="20" height="17" viewBox="0 0 20 17">
                  <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                </svg>
                <span>Choose a file…</span>
              </label>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Insertar</button>
            </div>
          </div>
        </div>
      </div>`
})
export class CropperModalComponent {
  @Input() name;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toasterService: ToasterService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = 310;
    this.cropperSettings.height = 200;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.preserveSize = true;

    this.data = {};
  }

  fileChangeListener($event) {
    var maximo = 1000000; //4.8 Mb esto es para probar 
    //max y min 
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    if (configImage.type.find(element => element === file.type) === undefined) {
      showToast(this.toasterService,'warning', configImage.message.warning);
      return;
    };

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      if (image.height == 0 && image.width == 0){
        showToast(this.toasterService, 'error', configImage.message.error);
        return;
      }
      console.log(image.height + 'px X ' + image.width + "px");
      this.cropper.setImage(image);

    };
    myReader.readAsDataURL(file);
  }

  getImageResize() {
    return this.data.image;
  }

  getImageFile() {
    return parseToFile(this.data.image);
  }

}