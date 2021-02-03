import { Component, OnInit } from '@angular/core';
import { Divisa } from 'src/shared/entities/divisa';
import { Serie } from 'src/shared/entities/serie';
import { StorageService } from 'src/shared/services/storage.service';
import { AppService } from '../../shared/services/app.service';
import * as moment from 'moment';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage  {

  divisaNombre:string;
  divisa:Divisa;
  series:Serie[]=[];
  constructor(private storageService: StorageService,private appService: AppService) { this.getDivisa(); }

  ngOnInit() {
   
  }

  async getDivisa(){
    this.divisa=await this.storageService.get('Divisa');
    this.divisaNombre=this.divisa.nombre;

    this.appService.getPosts(this.divisa.codigo).then(data=>{
      let indicadores:any=data;
      console.log(data['serie']);

      for(const x of data['serie']){
        this.series.push(new Serie({
          fecha:moment(x.fecha).format('DD-MM-YYYY'),
          valor:x.valor
        }))
      }
    });
  }

}
 

 