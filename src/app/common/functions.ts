import { ToasterConfig, Toast, BodyOutputType, ToasterService } from "angular2-toaster";

export function stringLimit(text, limit) {
  return (text.length < limit) ? text : text.substr(0, limit);
}

export function parseToFile(dataURI): File {
  // convert the data URL to a byte string
  const byteString = atob(dataURI.split(',')[1]);

  // pull out the mime type from the data URL
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // Convert to byte array
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Create a blob that looks like a file.
  const blob = new Blob([ab], { 'type': mimeString });
  blob['lastModifiedDate'] = (new Date()).toISOString();
  blob['name'] = 'file';

  // Figure out what extension the file should have
  switch (blob.type) {
    case 'image/jpeg':
      blob['name'] += '.jpg';
      break;
    case 'image/png':
      blob['name'] += '.png';
      break;
  }
  // cast to a File
  return <File>blob;
}

/**
 * funcion para mostrar mensaje emergente
 * 
 * @param service 
 * @param type 
 * @param msg 
 */
export function showToast(service: ToasterService, type: string, msg: string, title:string = null) {
  this.config = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'flyRight',
    limit: 5,
  });
  const toast: Toast = {
    type: type,
    title: title,
    body: msg,
    timeout: 5000,
    showCloseButton: true,
    bodyOutputType: BodyOutputType.TrustedHtml,
  };
  service.popAsync(toast);
}
