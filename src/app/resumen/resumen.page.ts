import { Component, OnInit } from '@angular/core';
import { Divisa } from 'src/shared/entities/divisa';
import { Serie } from 'src/shared/entities/serie';
import { StorageService } from 'src/shared/services/storage.service';
import { AppService } from '../../shared/services/app.service';
import * as moment from 'moment';
import { ChartDataSets,ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  divisaNombre:string;
  divisaValor:string;
  divisaFecha:string;
  divisaUnidad:string;
  divisa:Divisa;
  series:Serie[]=[];
  chartData:ChartDataSets[]=[{data:[],label:'Ultimos 10 dias',backgroundColor:'blue',borderColor:'blue'}];
  chartType:ChartType='line';
  chartLabels:Label[];
  constructor(private storageService: StorageService,private appService: AppService) { this.getDivisa(); }
  ngOnInit() {
  }
  async getDivisa(){
    let signo="$";
    this.divisa=await this.storageService.get('Divisa');
    this.divisaNombre=this.divisa.nombre;
    
    this.divisaUnidad=this.divisa.unidad_medida;

    if(this.divisaUnidad==='Porcentaje')
    {
      signo="%"
    }

    this.divisaValor=`${signo} ${this.divisa.valor}`;

    this.divisaFecha=moment(this.divisa.fecha).format('DD-MM-YYYY');
    this.chartLabels=[];
    this.chartData[0].data=[];
    this.appService.getPosts(this.divisa.codigo).then(data=>{
      for(const x of data['serie']){
        this.series.push(new Serie({
          fecha:moment(x.fecha).format('DD-MM-YYYY'),
          valor:x.valor
        }))
        this.chartLabels.push(moment(x.fecha).format('DD-MM-YYYY'));
        this.chartData[0].data.push(x.valor);
      }
    });
    
    

  }
   
}
