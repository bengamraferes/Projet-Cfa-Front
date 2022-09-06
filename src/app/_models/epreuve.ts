export class Epreuve {
    id: number;
    description : string;
    titre : string;
    version: number;
    blocCompetencesId : number;
    type : Type;
    blocCompetencesTitre : string;
    constructor() {
        this.id = 0;
        this.description = '';
        this.titre = '';
        this.version = 0;
        this.blocCompetencesId = 0;
        this.type = Type.QCM;
        this.blocCompetencesTitre = ""
    }

}
export enum Type {
    QCM ='QCM', 
    MES ='MES'
}
