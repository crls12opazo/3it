export class Divisa implements IDivisa{
    codigo:string;
    nombre:string;
    unidad_medida:string;
    fecha:string;
    valor:string;
    /**
     *
     */
    constructor(data?:IDivisa) {
        if(data){
            this.codigo=data.codigo;
            this.nombre=data.nombre;
            this.unidad_medida=data.unidad_medida;
            this.fecha=data.fecha;
            this.valor=data.valor;
        }
        
    }
}
interface IDivisa{
    codigo:string;
    nombre:string;
    unidad_medida:string;
    fecha:string;
    valor:string;
}