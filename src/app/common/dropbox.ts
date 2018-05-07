import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Dropbox, DropboxTeam } from "dropbox";

import { dBox } from './ConfigSettings';

@Injectable()
export class DropboxCripto {

  dbx: Dropbox;
  constructor() {
    this.dbx = new Dropbox({ accessToken: dBox.token });
    this.dbx.setClientId(dBox.key);
    this.dbx.filesSearch({})
    // this.dbx.filesListFolder({ path: '' })
    //   .then(response => {
    //     // this.dbx.filesGetTemporaryLink({ path: response.entries[0].path_display }).then(resp => {
    //     //   console.log(resp)
    //     // })
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // this.dbx.filesDownload({ path: '/alan.png' }).then(resp => {
    //   let image = new Image();
      // let img = document.getElementById('image');
      // console.log(document.getElementById('image'));
      // image.src = resp.link;
      // var canvas = document.createElement("canvas");
      // canvas.width = image.width;
      // canvas.height = image.height;
      // var ctx = canvas.getContext("2d");
      // ctx.drawImage(image, 0, 0);
      // var dataURL = canvas.toDataURL();
      // console.log(dataURL)
    //   console.log(resp);
    // })

    // console.log(this.dropbox.getAuthenticationUrl('/'));
  }

  getFileListForlder() {
    this.dbx.filesListFolder({ path: '' })
      .then(response => {

        this.dbx.filesGetTemporaryLink({ path: response.entries[0].path_display }).then(resp => {
          console.log(resp)
        })
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * 
   * @param file imagen que se subira al servidor de dropbox
   * @param userId id del usuario logeado en el sistema
   * @param publishId (opcional) id de la publicacion
   * @param folder (Opcional) directorio para las imagenes de publicaciones de cada componente
   * @param perfil (Opcional) defina true para subir como imagen principal de una publicacion
   * 
   * @returns retorna una promesa con una Objeto como respuesta. Ejemplo Object{link: url/imagen, metada: infoImagen}
   */
  imageUploadDropbox(file: File, userId: any, publishId?: any, folder?: String, perfil?: boolean): Promise<any> {
    let idImage = (publishId == undefined && folder == undefined && perfil == undefined) ? userId + '-perfil' : perfil ? 'perfil' : new Date().getTime(),
      ext = file.type.split('/')[1];
    publishId = (publishId === undefined) ? '' : '-' + publishId;

    let nameImage = idImage + '.' + ext;
    folder = (folder === undefined) ? '' : userId + '-' + folder + publishId + '/';
    return new Promise(resolve => {
      this.dbx.filesUpload({ path: '/' + folder + nameImage, contents: file }).then(response => {
        this.dbx.filesGetTemporaryLink({ path: '/' + folder + nameImage }).then((resp) => {
          resolve(resp);
        });
      }).catch(error => {
        console.error(error);
      });
    })
  }

  /**
   * Elimina el folder una publicacion
   * 
   * @param userId 
   * @param folder 
   * @param publishId 
   */
  deleteImagesPublish(userId: any, folder: string, publishId: any) {
    folder = '/' + userId + '-' + folder + '-' + publishId;
    this.dbx.filesDelete({ path: folder }).then(response => {
      console.log("borrando para actualizar imagenes de una publicacion");
    })
  }

  /**
   * Advertencia: debe definir las tres variable opcionales para acceder a un folder
   * 
   * @param name nombre de la imagen en el servidor dropbox
   * @param userId  (Opcional)
   * @param publishId (Opcional) 
   * @param folder (Opcional)
   */
  getImageUrlTemp(name: string, userId?: any, publishId?: any, folder?: String): Promise<any> {
    folder = (publishId == undefined && userId == undefined && folder == undefined) ? '' : `$(userId)-$(folder)-$(publishId)/`;
    let ruta = '/' + folder + name;
    return new Promise(resolve => {
      this.dbx.filesGetTemporaryLink({ path: ruta }).then(response => {
        resolve(response.link);
      })
    }
  }
}