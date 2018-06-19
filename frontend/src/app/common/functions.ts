import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';

let config: ToasterConfig;

export function stringLimit(text, limit) {
  return (text.length < limit) ? text : text.substr(0, limit);
}

export function parseToFile(dataURI): File {
  const byteString = atob(dataURI.split(',')[1]);

  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { 'type': mimeString });
  blob['lastModifiedDate'] = (new Date()).toISOString();
  blob['name'] = 'file';

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

export function showToast(service: ToasterService, type: string, msg: string, title: string = null) {
  config = new ToasterConfig({
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
