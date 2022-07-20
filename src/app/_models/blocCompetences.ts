export class BlocCompetences {
    id:number;
    description: string;
    titre:string;
    titreProfessionnelId:number;
    versionId: number;

    constructor(){
        this.id=0;
        this.titre ='';
        this.description = '';
        this.titreProfessionnelId = 0;
        this.versionId = 0;
    }

}