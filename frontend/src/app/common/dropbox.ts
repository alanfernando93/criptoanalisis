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
   * @param folder (Opcional) directorio para las imagenes de publicaciones de cada componente
   * @param name (Opcional) Id para el nombre de la imagen que se guadara en el servidor dropbox, deje vacio si desea subir la imagen como perfil
   * 
   * @returns retorna una promesa con el nombre de la imagen subida como respuesta. Ejemplo Object{link: url/imagen, metada: infoImagen}
   */
  imageUploadDropbox(file: File, userId: any, folder?: String, name?: any): Promise<any> {
    let idImage = (name == undefined) ? userId + '-perfil' : userId + '-' + name,
      ext = file.type.split('/')[1];
    let nameImage = idImage + '.' + ext;
    folder = (folder === undefined) ? '' : folder + '/';
    return new Promise(resolve => {
      this.dbx.filesUpload({ path: '/' + folder + nameImage, contents: file }).then(response => {
        resolve(response.name);
      }).catch(error => {
        console.error(error);
      });
    })
  }

  /**
   * 
   * @param folder folder de la imagen
   * @param name nombre de la imagen en la servidor de dropbox
   * 
   * @returns una promesa con la url temporal de la imagen seleccionada
   */
  getImageUrlTemporary(folder: String, name: any): Promise<any> {
    return new Promise(resolve => {
      this.dbx.filesGetTemporaryLink({ path: '/' + folder + '/' + name }).then(resp => {
        resolve(resp.link);
      })
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
}