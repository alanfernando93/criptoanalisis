// import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

// @Component({
//     selector: 'ngbd-modal-content',
//     template: `
//       <div class="modal-header">
//         <h4 class="modal-title">Hi there!</h4>
//         <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <p>Hello, {{name}}!</p>
//         <div class="file-upload">
//         <span class="text">upload</span>
//         <input id="custom-input" type="file" (change)="fileChangeListener($event)">
//       </div>
//       <img-cropper id="cropper" #cropper [image]="data" [settings]="cropperSettings"></img-cropper>
//       <br>
//       <span class="result rounded" *ngIf="data.image">
//         <img [src]="data.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight">
//       </span>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//       </div>`,
// })
// export class NgbdModalContent {
//     @Input() name;
//     @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
//     cropperSettings: CropperSettings;

//     data: any;

//     constructor(public activeModal: NgbActiveModal) {
//         this.cropperSettings = new CropperSettings();
//         this.cropperSettings.noFileInput = true;

//         this.cropperSettings.width = 100;
//         this.cropperSettings.height = 100;
//         this.cropperSettings.croppedWidth = 100;
//         this.cropperSettings.croppedHeight = 100;
//         this.cropperSettings.canvasWidth = 400;
//         this.cropperSettings.canvasHeight = 300;

//         this.data = {};
//     }

//     fileChangeListener($event) {
//         var image: any = new Image();
//         var file: File = $event.target.files[0];
//         var myReader: FileReader = new FileReader();
//         var that = this;
//         myReader.onloadend = function (loadEvent: any) {
//             image.src = loadEvent.target.result;
//             that.cropper.setImage(image);

//         };

//         myReader.readAsDataURL(file);
//     }
// }

// @Component({
//     selector: 'cropper-modal',
//     templateUrl: './croppermodal.component.html'
// })
// export class CropperModal {
//     constructor(private modalService: NgbModal) { }

//     open() {
//         const modalRef = this.modalService.open(NgbdModalContent);
//         modalRef.componentInstance.name = 'World';
//     }
// }