import {
  Component,
  OnDestroy,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ElementRef
} from "@angular/core";

import "tinymce";

import "tinymce/themes/modern";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/imagetools";
import 'tinymce/plugins/contextmenu';

import "../../../../assets/plugins/tradingview";

import { NewsService } from "../../../pages/news/news.service";
import { environment } from '../../../../environments/environment'

// declare var tinymce: any;

@Component({
  selector: "ngx-tiny-mce",
  template: `<textarea>
  <p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" />
  </p></textarea>
  `,
  providers:[NewsService]
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {
  @Input() height: String = "320";
  @Input() innerHTML: String;
  @Input() content: String;
  @Input() place;

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  baseUrl = environment.apiUrl;

  constructor(
    private host: ElementRef,
    private newsService: NewsService,
  ) { }

  ngAfterViewInit() {
    tinymce.init({
      target: this.host.nativeElement,
      selector: 'textarea',
      menubar: false,
      plugins: ['link image tradingview code', 'media table imagetools contextmenu'],
      toolbar: 'undo redo | formatselect | bold italic backcolor underline | alignleft aligncenter alignright alignjustify | blockquote | bullist numlist | link image media | tradingview | table',
      skin_url: 'assets/skins/lightgray',
      theme: 'modern',
      setup: editor => {
        this.editor = editor;
        editor.on('init', cont => {
          if (this.content) cont.target.setContent(this.content);
        });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      image_description: false,
      image_title: true,
      // automatic_uploads: true,
      file_picker_types: 'image',
      file_picker_callback: (cb, value, meta) => {
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

            // blobInfo.blobUri() => url de la imagen que sera insertada
            cb(blobInfo.blobUri(), { title: myFile.name });

          };
          reader.readAsDataURL(myFile);
          
        };
        input.click();
      },
      images_upload_handler: (blobInfo, success, failure) => {
        let body = new FormData();
        body.append('file', blobInfo.blob(), blobInfo.filename());
        this.newsService.fullUploadFileImage(body).subscribe(data=>{
          //success(this.baseUrl + "containers/galery/download/" + blobInfo.filename())
        })                 
      },
      height: this.height,
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
