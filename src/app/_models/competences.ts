export class Competences {
    id:number;
    description: string;
    titre:string;
    blocCompetencesId:number;
    version: number;

    constructor(){
        this.id=0;
        this.titre ='';
        this.description = '';
        this.blocCompetencesId = 0;
        this.version = 0;
    }
}