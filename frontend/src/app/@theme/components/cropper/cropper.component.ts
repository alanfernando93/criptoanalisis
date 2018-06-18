import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { parseToFile, showToast } from '../../../common/functions';
import { configImage } from '../../../common/ConfigSettings';

@Component({
  selector: 'ngx-cropper',
  templateUrl: './cropper.component.html',
})
export class CropperComponent {
  config: ToasterConfig;
  @Input() name;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toasterService: ToasterService,
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
    // max y min
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const format = configImage.type.find(element => element === file.type)
    // console.log(`${format} == ${file.type}`);
    if (format === undefined) {
      showToast(this.toasterService, 'warning', configImage.message.warning);
      return;
    };

    myReader.onloadend = (loadEvent: any) => {
      if (loadEvent.target.result === '') {
        showToast(this.toasterService, 'error', configImage.message.error);
        return;
      }
      image.src = loadEvent.target.result;

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
