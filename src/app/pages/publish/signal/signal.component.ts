import { Component, OnInit, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-publish-signal',
    styleUrls: ['./signal.component.scss'],
    templateUrl: 'signal.component.html'
})

export class SignalComponent implements OnInit {

    punto = 1;
    constructor(private modalService: NgbModal) { }

    ngOnInit() { }

    onSave() {

    }

    keyupHandlerFunction($event) {

    }

    onClickPuntos(content) {
        this.punto += 1;
        console.log(content);
    }
}