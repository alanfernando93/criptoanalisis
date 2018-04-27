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
  <p style="text-align: center; font-size: 15px;">
  <img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" />
  </p></textarea>
  `,
  providers: [NewsService]
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {
  @Input() height: String = "320";
  @Input() innerHTML: String;

  css = [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ];

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
      plugins: ['link image tradingview code', 'media table imagetools '],
      toolbar: 'undo redo | formatselect | bold italic backcolor underline | alignleft aligncenter alignright alignjustify | blockquote | bullist numlist | link image media | tradingview | table',
      skin_url: 'assets/skins/lightgray',
      theme: 'modern',
      setup: editor => {
        this.editor = editor;
        // editor.on('init', cont => {
        //   if (this.content) cont.target.setContent(this.content);
        // });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      // image_description: false,
      // image_title: true,
      // paste_data_images: true,
      // file_picker_types: 'image',
      height: this.height,
      content_css: this.css,
      // image_prepend_url: this.baseUrl + "containers/galery/download/",
      file_picker_callback: this.file_picker,
      //images_upload_handler: this.upload,
      // init_instance_callback: this.editorEvent,
    });
  }

  editorEvent = (editor) => {
    editor.on('GetContent', function (e) {
      e.content += 'My custom content!';
      console.log('My custom content!');
    });
    editor.on('focus', function (e) {
      console.log(e)
      console.log('Editor got focus!');
    });
  }

  upload = (blobInfo, success, failure) => {
    let body = new FormData();
    body.append('file', blobInfo.blob(), blobInfo.id());
    this.newsService.fullUploadFileImage(body).subscribe(data => {
      success(this.baseUrl + "containers/galery/download/" + blobInfo.id())
    })
  }

  file_picker = (cb, value, meta) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = event => {
      let myFile = event['target']['files'][0];
      let reader = new FileReader();
      reader.onload = () => {
        console.log(myFile);
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
  }

  file_browser = (field_name, url, type, win) => {
    var filebrowser = "filebrowser.php";
    filebrowser += (filebrowser.indexOf("?") < 0) ? "?type=" + type : "&type=" + type;
    tinymce.activeEditor.windowManager.open({
      title: "Insertar fichero",
      width: 520,
      height: 400,
      url: filebrowser
    }, {
        window: win,
        input: field_name
      });
    return false;
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
