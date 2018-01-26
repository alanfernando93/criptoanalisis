import { Component, OnDestroy, AfterViewInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';

import 'tinymce';

import 'tinymce/themes/modern';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/wordcount';

// declare var tinymce: any;

@Component({
  selector: 'ngx-tiny-mce',
  template: '',
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {

  @Input() height: String = '320';
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  @Output() editorKeyup = new EventEmitter<any>();

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    tinymce.init({
      target: this.host.nativeElement,
      menubar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools wordcount"
      ],
      toolbar: 'undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | tradingview | image',
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        // editor.on('keyup', () => {
        //   this.editorKeyup.emit(editor.getContent());
        // });
        // editor.startContent('<p>hola</p>');
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      height: this.height,
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
