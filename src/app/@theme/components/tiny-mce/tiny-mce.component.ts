import { Component, OnDestroy, AfterViewInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';

import 'tinymce';

import 'tinymce/themes/modern';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/imagetools';

import '../../../../assets/plugins/tradingview'

// declare var tinymce: any;

@Component({
  selector: 'ngx-tiny-mce',
  template: `
  `,
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit{

  @Input() height: String = '320';
  @Input() innerHTML: String;
  @Input() content: String;
  @Input() place;

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  files;

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {

    // console.log(this.content);
    tinymce.init({
      target: this.host.nativeElement,
      // selector:"textarea",
      menubar: false,
      plugins: [
        "link image tradingview code",
        "media table imagetools"
      ],
      toolbar: 'undo redo | formatselect | bold italic backcolor underline | alignleft aligncenter alignright alignjustify | blockquote | bullist numlist | link image media | tradingview | table',
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('init', (cont) => {
          if(this.content) cont.target.setContent(this.content);
        });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      image_title: true,
      automatic_uploads: true,
      file_picker_types: 'image',
      file_picker_callback: (cb, value, meta)=>{
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        // Note: In modern browsers input[type="file"] is functional without
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it anymore.

        input.onchange = function(event){
          var file = event['target']['files'][0];

          var reader = new FileReader();
          reader.onload = function () {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
    	},
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ],
      height: this.height,
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
