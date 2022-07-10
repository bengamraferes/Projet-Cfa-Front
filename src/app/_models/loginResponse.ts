export class LoginResponse {

    id:number;
    firstName:string;
    lastName:string;
    email:string;
    token?:string;

    constructor(){
      this.id = 0;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
    }
}
