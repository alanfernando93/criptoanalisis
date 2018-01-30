import { Component, OnInit, OnDestroy, AfterViewInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';

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
export class TinyMCEComponent implements OnDestroy, AfterViewInit, OnInit{

  @Input() height: String = '320';
  
  @Input() body:String = "";
  @Output() onEditorKeyup = new EventEmitter<any>();
  editor;
  @Output() editorKeyup = new EventEmitter<any>();

  constructor(private host: ElementRef) { 
  }

  ngOnInit(){
    // console.log("-->"+this.body);
  }

  ngAfterViewInit() {

    console.log(this.body);
    tinymce.init({
      target: this.host.nativeElement,
      // selector:"textarea",
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
        editor.on('init', (cont) => {
          if(this.body) cont.target.setContent(this.body);
          // console.log(cont);
        });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          // console.log(content);
          this.onEditorKeyup.emit(content);
        });
      },
      height: this.height,
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  set value(v: any){
    this.body = v;
  }

  get value(){
    return this.body;
  }
}
