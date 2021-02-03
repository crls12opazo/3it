export class HttpOptions {

    constructor(
        public url: string = "", 
        public method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET', 
        public auth: boolean = false
    ) { 
        this.url = url;
        this.method = method;
        this.auth = auth;
    }

    public bodyData = undefined;
    body(bodyData: object){
        if(this.method.toUpperCase() === 'GET' || this.method.toUpperCase() === 'DELETE') {
            let aux = [];
            for(let param in bodyData) {
                if(bodyData[param] !== undefined  && bodyData[param] !== '') {
                    aux.push([param, bodyData[param]].join("="));  
                }
            }
            this.url = this.url + '?' + aux.join("&");
        } else {
            this.bodyData = bodyData;
        }
    }

    private headers = [];
    addHeader(key: string, value: string){
        this.headers.push({key:key,value:value});
    }

    public contentType = null;
    setContentType(contentType:string){
        contentType = contentType;
    }

    getHeaders(){   
        return this.headers;
    }
}