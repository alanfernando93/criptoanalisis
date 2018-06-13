import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { parseToFile, showToast } from '../../../common/functions';
import { configImage } from '../../../common/ConfigSettings';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './croppermodal.component.html'
})
export class CropperModalComponent {
  config: ToasterConfig;
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
    this.cropperSettings.minWidth = 120;
    this.cropperSettings.minHeight = 10;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.preserveSize = true;
    this.data = {};

    if (screen.width <= 414) {
      this.cropperSettings.canvasWidth = 250;
      this.cropperSettings.canvasHeight = 200;
    }

  }

  fileChangeListener($event) {
    var maximo = 1000000; //4.8 Mb esto es para probar 
    //max y min 
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    let format = configImage.type.find(element => element === file.type)
    // console.log(`${format} == ${file.type}`);
    if (format === undefined) {
      showToast(this.toasterService, 'warning', configImage.message.warning);
      return;
    };

    myReader.onloadend = (loadEvent: any) => {
      if (loadEvent.target.result == "") {
        showToast(this.toasterService, 'error', configImage.message.error);
        return;
      }
      image.src = loadEvent.target.result;
      console.log(image.height + 'px X ' + image.width + "px");
      this.cropper.setImage(image);
      showToast(this.toasterService, 'success', configImage.message.success);
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