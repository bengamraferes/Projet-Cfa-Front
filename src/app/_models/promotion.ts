export class Promotion {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    titreProfessionnelId: number;
    villeId: number;
    villeNom : string;
    titreProfessionnelTitre : string;
    etudiantsId:[number];
    version: number;

    constructor() {
        this.id = 0;
        this.dateDebut = new Date;
        this.dateFin = new Date;
        this.titreProfessionnelId = 0;
        this.villeId = 0;
        this.villeNom = '';
        this.titreProfessionnelTitre = '';
        this.etudiantsId = [0];
        this.version = 0; 
    }

}
