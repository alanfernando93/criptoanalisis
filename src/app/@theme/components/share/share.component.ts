import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-share',
    template: `<nb-card>
    <nb-card-header>
        <div class="row">
            <div class="col-12 col-md-2">
                <h5 class="text-body compartir">Compartir : </h5>
            </div>
            <div class="col-12 col-md-3">
                <div class="text-center center-block">
                    <a href="#">
                        <i id="social-fb" class="fa fa-facebook-square fa-3x social"></i>
                    </a>
                    <a href="#">
                        <i id="social-tw" class="fa fa-twitter-square fa-3x social"></i>
                    </a>
                    <a href="#">
                        <i id="social-gp" class="fa fa-google-plus-square fa-3x social"></i>
                    </a>
                    <a href="#">
                        <i id="social-em" class="fa fa-envelope-square fa-3x social"></i>
                    </a>
                </div>
            </div>
        </div>
    </nb-card-header>
</nb-card>`,
    styles: [`.social li {
        background: none repeat scroll 0 0 #B5B5B5;
        border: 2px solid #B5B5B5;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -o-border-radius: 50%;
        -ms-border-radius: 50%;
        border-radius: 50%;
        float: left;
        height: 36px;
        line-height: 36px;
        margin: 0 8px 0 0;
        padding: 0;
        text-align: center;
        width: 36px;
        text-decoration: none;
        transition: all 0.5s ease 0s;
        -moz-transition: all 0.5s ease 0s;
        -webkit-transition: all 0.5s ease 0s;
        -ms-transition: all 0.5s ease 0s;
        -o-transition: all 0.5s ease 0s;
    }
    .social li:hover {
        transform: scale(1.15) rotate(360deg);
        -webkit-transform: scale(1.1) rotate(360deg);
        -moz-transform: scale(1.1) rotate(360deg);
        -ms-transform: scale(1.1) rotate(360deg);
        -o-transform: scale(1.1) rotate(360deg);
    }
    .social li a {
        color: #EDEFF1;
    }
    .social li:hover {
        border: 2px solid #2c3e50;
        background: #2c3e50;
    }
    .social li a i {
        font-size: 16px;
        margin: 0 0 0 5px;
        color: #EDEFF1 !important;
    }
    
    
    .social:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
    }
    .social {
        -webkit-transform: scale(0.8);
        /* Browser Variations: */
        
        -moz-transform: scale(0.8);
        -o-transform: scale(0.8);
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        -o-transition-duration: 0.5s;
    }
    
    /*
       Multicoloured Hover Variations
    */
    
    #social-fb:hover {
        color: #3B5998;
    }
    #social-tw:hover {
        color: #4099FF;
    }
    #social-gp:hover {
        color: #d34836;
    }
    #social-em:hover {
        color: #f39c12;
    }
    
    .compartir {
        margin-top: 18px;
    }`]
})
export class shareComponent {
    
    constructor(){

    }
}