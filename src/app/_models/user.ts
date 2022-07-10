export class User {

  id:number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  active:boolean;
  role:string;
  version:number;
  imagePath:string;

  constructor(){
    this.id=0;
    this.firstName= '';
    this.lastName = '';
    this.email= '';
    this.password='';
    this.active=false;
    this.role='';
    this.version=0;
    this.imagePath='';

  }
}
