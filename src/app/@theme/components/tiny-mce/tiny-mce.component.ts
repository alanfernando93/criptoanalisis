import {
  Component,
  OnDestroy,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ElementRef
} from "@angular/core";

import { UserService } from '../../../@core/data/users.service';

import "tinymce";

import "tinymce/themes/modern";
import "tinymce/plugins/advlist";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/imagetools";

import "../../../../assets/plugins/tradingview";

// declare var tinymce: any;

@Component({
  selector: "ngx-tiny-mce",
  template: `
  `
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {
  @Input() height: String = "320";
  @Input() innerHTML: String;
  @Input() content: String;
  @Input() place;

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  files;

  constructor(
    private host: ElementRef,
    public userService: UserService,
  ) {console.log(this.userService.getToken())}

  ngAfterViewInit() {
    tinymce.init({
      target: this.host.nativeElement,
      // selector:"textarea",
      menubar: false,
      plugins: ["link image tradingview code", "media table imagetools lists"],
      toolbar:
        "undo redo | formatselect | bold italic backcolor underline | alignleft aligncenter alignright alignjustify | blockquote | bullist numlist | link image media | tradingview | table",
      skin_url: "assets/skins/lightgray",
      setup: editor => {
        this.editor = editor;
        editor.on("init", cont => {
          if (this.content) cont.target.setContent(this.content);
        });
        editor.on("keyup change", () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      image_title: true,
      automatic_uploads: true,
      file_picker_types: "image",
      file_picker_callback: (cb, value, meta) => {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.onchange = function(event) {
          var file = event["target"]["files"][0];

          var reader = new FileReader();
          reader.onload = function() {
            var id = "blobid" + new Date().getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
      },
      content_css: [
        "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
        "//www.tinymce.com/css/codepen.min.css"
      ],
      images_upload_handler: function(blobInfo, success, failure) {
        // var xhr, formData;
        // xhr = new XMLHttpRequest();
        // xhr.withCredentials = false;
        // xhr.open("POST", "http://191.101.228.157:8080/api/usuario/update"+this.userService.getToken());
        // xhr.onload = function() {
        //   var json;

        //   if (xhr.status != 200) {
        //     failure("HTTP Error: " + xhr.status);
        //     return;
        //   }
        //   json = JSON.parse(xhr.responseText);

        //   if (!json || typeof json.location != "string") {
        //     failure("Invalid JSON: " + xhr.responseText);
        //     return;
        //   }
        //   success(json.location);
        // };
        // formData = new FormData();
        // formData.append("file", blobInfo.blob().fileName(blobInfo));
        // xhr.send(formData);
        let body = new  FormData()
        body.append('file', blobInfo.blob().fileName(blobInfo));
        this.userService.makeFileRequest(body).then(resp=>{
          console.log(resp);
        })
        // console.log(blobInfo.blob());
      },
      height: this.height
    });
    // tinymce.activeEditor.uploadImages();
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
