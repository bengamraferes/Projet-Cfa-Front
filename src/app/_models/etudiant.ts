 import {User} from './user'
 export class Etudiant extends User{
    promotionsId :[number];

     constructor(){
        super();
        this.promotionsId = [0];
    }

}