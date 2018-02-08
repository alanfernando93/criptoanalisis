import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-publish-signal',
    styleUrls: ['./signal.component.scss'],
    templateUrl: 'signal.component.html'
})

export class SignalComponent implements OnInit {
    
    punto = 1;
    constructor() { }

    ngOnInit() { }

    onSave(){

    }

    keyupHandlerFunction($event){
        
    }

    onClickPuntos(content){
        this.punto+=1;
        console.log(content);
    }
}