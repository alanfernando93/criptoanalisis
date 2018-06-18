import { ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

export abstract class Utils {

    toasterService: any;
    config: ToasterConfig;
    public showToast(type: string, body: string, title: string = null) {
        this.config = new ToasterConfig({
            positionClass: 'toast-top-right',
            timeout: 5000,
            newestOnTop: true,
            tapToDismiss: true,
            preventDuplicates: true,
            animation: 'flyRight',
            limit: 5,
        });
        const toast: Toast = {
            type: type,
            title: title,
            body: body,
            timeout: 1500,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
    }
}
