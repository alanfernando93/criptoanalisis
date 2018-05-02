import { Component, OnDestroy, AfterViewInit, Output, Input, OnChanges, EventEmitter, ElementRef, } from '@angular/core';

import { Dropbox } from 'dropbox';

import { parseToFile } from '../../../common/functions'

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

import { environment } from '../../../../environments/environment'
import { NewsService } from '../../../pages/news/news.service';

declare var tinymce: any;

@Component({
  selector: 'ngx-tiny-mce',
  template: ``,
  providers: [NewsService]
})

export class TinyMCEComponent implements OnDestroy, AfterViewInit {
  @Input() height: String = '320';
  @Input() innerHTML: String;

  @Output() onEditorKeyup = new EventEmitter<any>();

  style = [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ];

  imageCollection: any = [];

  editor;
  baseUrl = environment.apiUrl;

  constructor(
    private host: ElementRef,
    private newsService: NewsService
  ) { }

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
        var id = 'blobid' + new Date().getTime();
        let body = new FormData();
        body.append('file', blobInfo.blob(), id + "." + (blobInfo.filename()).split(".")[1]);
        this.newsService.fullUploadFileImage(body).subscribe(r => {
          success(this.baseUrl + "containers/galery/download/" + id + "." + (blobInfo.filename()).split(".")[1]);
        })
        // console.log("Uploading image");
        // success("/some/path.jpg");
      },
    });
  }

  file_picker = (cb, value, meta) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = event => {
      let myFile = event['target']['files'][0];
      let reader = new FileReader();
      reader.onload = () => {
        var id = 'blobid' + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, myFile, base64);
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
