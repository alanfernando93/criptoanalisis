import { Component } from '@angular/core';

@Component({
  selector: 'ngx-preload',
  template: `
  <div class="preload">
    <img src="../../../../assets/images/preload.gif" alt="">
  </div>`,
  styleUrls: ['./preload.component.scss'],
})
export class PreloadComponent {

  constructor() { }

}
