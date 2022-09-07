 import { Evaluation } from './evaluation';
import {User} from './user'
 export class Etudiant extends User{
    promotionsId :number[];
    notesByEpreuve : Map<number,Evaluation>;
    modifier :boolean;

     constructor(){
        super();
        this.promotionsId = [];
        this.notesByEpreuve =new Map<number,Evaluation>();
        this.modifier =false;
    }
  
 
}