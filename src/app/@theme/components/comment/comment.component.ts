import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class commentComponent {

  @Input() coment: any = [];
  @Input() fama: any;

constructor(){
}

}
