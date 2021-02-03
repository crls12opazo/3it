import { Component } from '@angular/core';

import { AppService } from '../../shared/services/app.service';
import { StorageService } from 'src/shared/services/storage.service';
import { Indicador } from 'src/shared/entities/indicador';
import { Divisa } from 'src/shared/entities/divisa';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 search :string='';
 indicador:Indicador;
 indicadores:Indicador[]=[];
 divisas:Divisa[]=[]
 divisa:Divisa;
 constructor(private appService: AppService, private storageService: StorageService,private router: Router,) {}

 ngOnInit() {
  this.getData();
 }

 async getData(){
  this.appService.getPosts('').then(data=>{
    let result  =  JSON.stringify(data)
    let obj:Indicador=JSON.parse(result)
    
    let uf:Divisa=new Divisa({
      codigo:obj.uf.codigo,
      nombre:obj.uf.nombre,
      unidad_medida:obj.uf.unidad_medida,
      fecha:obj.uf.fecha,
      valor:obj.uf.valor
    });
    let ivp:Divisa=new Divisa({
      codigo:obj.ivp.codigo,
      nombre:obj.ivp.nombre,
      unidad_medida:obj.ivp.unidad_medida,
      fecha:obj.ivp.fecha,
      valor:obj.ivp.valor
    });
    let dolar:Divisa=new Divisa({
      codigo:obj.dolar.codigo,
      nombre:obj.dolar.nombre,
      unidad_medida:obj.dolar.unidad_medida,
      fecha:obj.dolar.fecha,
      valor:obj.dolar.valor
    });
    let dolar_intercambio:Divisa=new Divisa({
      codigo:obj.dolar_intercambio.codigo,
      nombre:obj.dolar_intercambio.nombre,
      unidad_medida:obj.dolar_intercambio.unidad_medida,
      fecha:obj.dolar_intercambio.fecha,
      valor:obj.dolar_intercambio.valor
    });
    let euro:Divisa=new Divisa({
      codigo:obj.euro.codigo,
      nombre:obj.euro.nombre,
      unidad_medida:obj.euro.unidad_medida,
      fecha:obj.euro.fecha,
      valor:obj.euro.valor
    });
    let ipc:Divisa=new Divisa({
      codigo:obj.ipc.codigo,
      nombre:obj.ipc.nombre,
      unidad_medida:obj.ipc.unidad_medida,
      fecha:obj.ipc.fecha,
      valor:obj.ipc.valor
    });
    let utm:Divisa=new Divisa({
      codigo:obj.utm.codigo,
      nombre:obj.utm.nombre,
      unidad_medida:obj.utm.unidad_medida,
      fecha:obj.utm.fecha,
      valor:obj.utm.valor
    });
    let imacec:Divisa=new Divisa({
      codigo:obj.imacec.codigo,
      nombre:obj.imacec.nombre,
      unidad_medida:obj.imacec.unidad_medida,
      fecha:obj.imacec.fecha,
      valor:obj.imacec.valor
    });
    let tpm:Divisa=new Divisa({
      codigo:obj.tpm.codigo,
      nombre:obj.tpm.nombre,
      unidad_medida:obj.tpm.unidad_medida,
      fecha:obj.tpm.fecha,
      valor:obj.tpm.valor
    });
    let libra_cobre:Divisa=new Divisa({
      codigo:obj.libra_cobre.codigo,
      nombre:obj.libra_cobre.nombre,
      unidad_medida:obj.libra_cobre.unidad_medida,
      fecha:obj.libra_cobre.fecha,
      valor:obj.libra_cobre.valor
    });
    let tasa_desempleo:Divisa=new Divisa({
      codigo:obj.tasa_desempleo.codigo,
      nombre:obj.tasa_desempleo.nombre,
      unidad_medida:obj.tasa_desempleo.unidad_medida,
      fecha:obj.tasa_desempleo.fecha,
      valor:obj.tasa_desempleo.valor
    });
    let bitcoin:Divisa=new Divisa({
      codigo:obj.bitcoin.codigo,
      nombre:obj.bitcoin.nombre,
      unidad_medida:obj.bitcoin.unidad_medida,
      fecha:obj.bitcoin.fecha,
      valor:obj.bitcoin.valor
    });
    this.divisas.push(uf);
    this.divisas.push(ivp);
    this.divisas.push(dolar);
    this.divisas.push(dolar_intercambio);
    this.divisas.push(euro);
    this.divisas.push(ipc);
    this.divisas.push(utm);
    this.divisas.push(imacec);
    this.divisas.push(tpm);
    this.divisas.push(libra_cobre);
    this.divisas.push(tasa_desempleo);
    this.divisas.push(bitcoin);

  });
 
 }

 filter(divisa: Divisa){
  if(this.search && this.search.trim().length > 0){
    if(divisa.nombre.toLowerCase().indexOf(this.search.toLowerCase()) !==-1 ){
      return true;
    }
    return false;
  }
  return true;
}
setDivisaDelay(divisa: Divisa){
  
    this.selectLocation(divisa);

}
async selectLocation(divisa: Divisa){
  await this.storageService.set('Divisa',divisa);
      this.storageService.getDivisa().subscribe(async (divisa: Divisa) => {
        this.divisa = divisa;
        this.router.navigate(['detalle'],{replaceUrl:false});
      }); 
}
async selectLocationResumen(divisa: Divisa){
  await this.storageService.set('Divisa',divisa);
      this.storageService.getDivisa().subscribe(async (divisa: Divisa) => {
        this.divisa = divisa;
        this.router.navigate(['resumen'],{replaceUrl:false});
      }); 
}
resumen(divisa: Divisa){
  this.selectLocationResumen(divisa);
}

}




