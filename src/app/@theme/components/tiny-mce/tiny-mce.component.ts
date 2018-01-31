import { Component, OnInit, OnDestroy, AfterViewInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';

import 'tinymce';

import 'tinymce/themes/modern';
import 'tinymce/plugins/example'
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
  @Input()
  set value(val: any){
    this.body = val.contenido;
  }
  
  @Output() onEditorKeyup = new EventEmitter<any>();
  
  @Output() editorKeyup = new EventEmitter<any>();
  editor;
  body:String = "";

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
        "insertdatetime media table contextmenu paste imagetools wordcount example"
      ],
      toolbar: 'undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | tradingview | image | example',
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
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ],
      height: this.height,
    });
    tinymce.PluginManager.add('example', function(editor, url) {
      // Add a button that opens a window
      editor.addButton('example', {
        text: 'My button',
        icon: false,
        onclick: function() {
          // Open window
          editor.windowManager.open({
            title: 'Example plugin',
            body: [
              {type: 'textbox', name: 'title', label: 'Title'}
            ],
            onsubmit: function(e) {
              // Insert content when the window form is submitted
              editor.insertContent('Title: ' + e.data.title);
            }
          });
        }
      });
    
      // Adds a menu item to the tools menu
      editor.addMenuItem('example', {
        text: 'Example plugin',
        context: 'tools',
        onclick: function() {
          // Open window with a specific url
          editor.windowManager.open({
            title: 'TinyMCE site',
            url: 'https://www.tinymce.com',
            width: 800,
            height: 600,
            buttons: [{
              text: 'Close',
              onclick: 'close'
            }]
          });
        }
      });
    
      return {
        getMetadata: function () {
          return  {
            title: "Example plugin",
            url: "http://exampleplugindocsurl.com"
          };
        }
      };
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
