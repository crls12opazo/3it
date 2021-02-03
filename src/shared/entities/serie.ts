export class Serie implements ISerie{
    fecha:string;
    valor:number;
    /**
     *
     */
    constructor(data?:ISerie) {
        if(data)
        {
            this.fecha=data.fecha;
            this.valor=data.valor;
        }
    }
}
interface ISerie{
    fecha:string;
    valor:number;
}