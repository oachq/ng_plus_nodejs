import { environment } from '../environments/environment';

const base_url = environment.base_url;
export class Usuariio {

    constructor(
        public nombre   : string,
        public email    : string,
        public password : string,
        public img?     : string,
        public google?  : string,
        public role?    : string,
        public uid?     : string,
    ){}


    // /uploads/usuario/no-img
    get imagenUrl(){

        if(!this.img){
            return `${base_url}/uploads/usuario/no_img`
        }else if(this.img.includes('https')){
            return this.img;
        }else if (this.img) {
            return `${base_url}/uploads/usuario/${this.img}`;
        }else {
            return `${base_url}/uploads/usuario/no_img`
        }
        
    }
}