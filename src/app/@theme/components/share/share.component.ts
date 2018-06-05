import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-share',
    template: `<nb-card>
    <nb-card-header>
        <div class="row">
            <div class="col-12 col-md-2">
                <h5 class="text-body compartir">Compartir : </h5>
            </div>
          <div class="col-md-8">
          <ul class="social-network social-circle">
              <li><a md-raised-button shareButton="facebook" [sbTitle]="titleFacebook" [sbDescription]="descripFacebook" [sbImage]="imageFacebook" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
              <li><a md-raised-button shareButton="twitter" [sbTitle]="titleTwitter" [sbTags]="tagTwitter" class="icoTwitter"><i class="fa fa-twitter"></i></a></li>
              <li><a md-raised-button shareButton="linkedin" [sbDescription]="descripLinkedin" [sbTitle]="titleLinkedin" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
              <li><a md-raised-button shareButton="whatsapp" [sbTitle]="titleWhatsapp" [sbDescription]="descripWhatsapp" class="icoWhatsapp"><i class="fa fa-whatsapp"></i></a></li>
          </ul>				
      </div>
        </div>
    </nb-card-header>
</nb-card>`,
    styles: [`
    
    /* footer social icons */
    ul.social-network {
        list-style: none;
        display: inline;
        margin-left:0 !important;
        padding: 0;
    }
    ul.social-network li {
        display: inline;
        margin: 0 5px;
    }
    
    
    /* footer social icons */
    .social-network a.icoRss:hover {
        background-color: #F56505;
    }
    .social-network a.icoFacebook:hover {
        background-color:#3B5998;
    }
    .social-network a.icoTwitter:hover {
        background-color:#33ccff;
    }
    .social-network a.icoGoogle:hover {
        background-color:#BD3518;
    }
    .social-network a.icoVimeo:hover {
        background-color:#0590B8;
    }
    .social-network a.icoLinkedin:hover {
        background-color:#007bb7;
    }
    .social-network a.icoWhatsapp:hover {
        background-color:#25d366;
    }
    .social-network a.icoRss:hover i, .social-network a.icoFacebook:hover i, .social-network a.icoTwitter:hover i,
    .social-network a.icoGoogle:hover i, .social-network a.icoVimeo:hover i, .social-network a.icoLinkedin:hover i {
        color:#fff;
    }
    a.socialIcon:hover, .socialHoverClass {
        color:#44BCDD;
    }
    
    .social-circle li a {
        display:inline-block;
        position:relative;
        margin:0 auto 0 auto;
        -moz-border-radius:50%;
        -webkit-border-radius:50%;
        border-radius:50%;
        text-align:center;
        width: 50px;
        height: 50px;
        font-size:20px;
    }
    .social-circle li i {
        margin:0;
        line-height:50px;
        text-align: center;
    }
    
    .social-circle li a:hover i, .triggeredHover {
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -ms--transform: rotate(360deg);
        transform: rotate(360deg);
        -webkit-transition: all 1.2s;
        -moz-transition: all 1.2s;
        -o-transition: all 1.2s;
        -ms-transition: all 1.2s;
        transition: all 1.2s;
    }
    .social-circle i {
        color: #fff;
        -webkit-transition: all 1.8s;
        -moz-transition: all 1.8s;
        -o-transition: all 1.8s;
        -ms-transition: all 1.8s;
        transition: all 1.8s;
    }
    
    a {
     background-color: #D3D3D3;   
    }`]
})
export class shareComponent {

    @Input() titleFacebook: any = [];
    @Input() descripFacebook: any = [];
    @Input() imageFacebook: any;
    
    @Input() titleTwitter: any = [];
    @Input() tagTwitter: any = [];

    @Input() titleLinkedin: any = [];
    @Input() descripLinkedin: any = [];

    @Input() titleWhatsapp: any = [];
    @Input() descripWhatsapp: any = [];

    constructor() {

    }
}