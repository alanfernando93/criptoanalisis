import { Component, OnDestroy, AfterViewInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';

import { DropboxCripto } from '../../../common/dropbox';

// A theme is also required
import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/contextmenu';

import '../../../../assets/plugins/tradingview';

import { Session } from '../../../@core/data/session';

declare var tinymce: any;

@Component({
  selector: 'ngx-tiny-mce',
  template: ``,
})

export class TinyMCEComponent extends Session implements OnDestroy, AfterViewInit {
  @Input() height: String = '320';
  @Input() innerHTML: String;
  @Input() serviceFolder: String;

  @Output() onEditorKeyup = new EventEmitter<any>();

  style = [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css',
  ];

  imageCollection: any = [];

  editor;
  baseUrl = this.getApiRest();

  constructor(
    private host: ElementRef,
    private dropbox: DropboxCripto,
  ) {
    super();
  }

  ngAfterViewInit() {
    tinymce.init({
      target: this.host.nativeElement,
      // selector: '#'+this.id,
      menubar: false,
      plugins: ['link image tradingview code', 'media table imagetools '],
      toolbar: 'undo redo | formatselect | bold italic backcolor underline | alignleft aligncenter alignright alignjustify | blockquote | bullist numlist | link image media | tradingview | table',
      skin_url: 'assets/skins/lightgray',
      theme: 'modern',
      setup: editor => {
        this.editor = editor;
        // editor.on('init', cont => {
        //   if (this.content) cont.target.setContent(this.content);
        // });
        editor.on('change', () => {
          this.onEditorKeyup.emit(editor.getContent());
        })
      },
      image_description: false,
      image_title: false,
      image_dimensions: false,
      paste_data_images: true,
      file_picker_types: 'image',
      automatic_uploads: false,
      height: this.height,
      content_css: this.style,
      file_picker_callback: this.file_picker,
      images_upload_handler: (blobInfo, success, failure) => {
        const id = new Date().getTime();
        // let body = new FormData();
        // body.append('file', blobInfo.blob(), id + "." + (blobInfo.filename()).split(".")[1]);
        // this.newsService.fullUploadFileImage(body).subscribe(r => {
        //   success(this.baseUrl + "containers/galery/download/" + id + "." + (blobInfo.filename()).split(".")[1]);
        // })
        this.dropbox.imageUploadDropbox(blobInfo.blob(), this.getUserId(), this.serviceFolder, id).then(resp => {
          success('dropbox:' + resp + ':');
        });
        // console.log("Uploading image");
        // success("/some/path.jpg");
      },
    });
  }

  file_picker = (cb, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = event => {
      const myFile = event['target']['files'][0];
      const reader = new FileReader();
      reader.onload = () => {
        const id = 'blobid' + new Date().getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(',')[1];
        const blobInfo = blobCache.create(id, myFile, base64);
        blobCache.add(blobInfo);
        cb(blobInfo.blobUri(), { title: myFile.name });
      };
      reader.readAsDataURL(myFile);
    };
    input.click();
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
