
import { Component, OnInit, Output,Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'ngx-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent {

  @Output() onGetObject = new EventEmitter<any>();
  @Input() onGetHorario :any="";
  verificar:boolean=false;
  advisory:any;
  vhorario=[];
  id;
  slots = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  days = ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    selection = {
          state: false,
          day: [0, 0, 0, 0, 0, 0, 0],
          hour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
    objsel={
      dia:"",
      hora:""
    };
   

  constructor(private http: Http, private route: ActivatedRoute) {
      
  }

    ngOnInit() {
    
      
      
      if(this.onGetHorario!=""){
        this.slots=[];
        this.slots=this.onGetHorario;
       
      }
      this.loop;
      this.toggle;
      this.select;
      //this.slots=this.onGetHorario;    
    }
      
    
     
    
    loop(begin, end, step) {
      var array = [];
      
      for (var i = begin; i <= end; i += step) {
        array.push(i);
      }
      
      return array;
    }
    toggle(what, day, hour) {
      var i = 0;
      
      switch (what) {
        case 'day':
          this.selection.day[day] = this.selection.day[day];
          
          for (i = 0; i < 24; i++) {
            if(this.slots[day][i]==0)
            {
              this.slots[day][i] =1 ;
            }
            else
            {
              this.slots[day][i] =0 ;
            }
            
               
          }
        break;
        
        case 'hour':
          this.selection.hour[hour] = this.selection.hour[hour];
          
          for (i = 0; i < 7; i++) {
            if(this.slots[i][hour]==0)
              {
                this.slots[i][hour] = 1;
              }
              else
              {
                this.slots[i][hour] = 0;
              }
            
            console.log(this.selection.hour[hour] )
          }
        break;
        
        case 'slot':
          if (this.selection.state) {
            this.slots[day][hour] = this.slots[day][hour];
            if(this.slots[day][hour]==0)
            {
              this.slots[day][hour]=1;
            }
            else
            {
              this.slots[day][hour]=0;
                          }
            
                          

          }
            
            
          
        break;
      }
    }
    
    
    select(state, day, hour) {
      this.selection.state = state;
      
      if (this.selection.state) {
        this.toggle('slot', day, hour);
        let data= {
          dia:day,
          hora:hour
        }

        if(this.slots[day][hour]==1)
            {
              
              this.vhorario.push(data);  
            }
          else
          {
            
          for(var i=0;i<=this.vhorario.length;i++)
            {
              if(this.vhorario[i].dia===data.dia&&this.vhorario[i].hora===data.hora)
              {
                this.verificar=true;
                this.vhorario.splice(i,1);
              }
            }
          } 
         this.objsel.dia=day;
         this.objsel.hora=hour;
         
        
         console.log(this.vhorario.includes(data))
        
         
         
          console.log(this.objsel)
          
          console.log(this.vhorario)
      }

      this.onGetObject.emit(this.vhorario);
      
    }
    
}
