export class Intervention {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    formateurId: number;
    formationId: number;
    promotionId: number;
    versionId: number;

    constructor() {
        this.id = 0;
        this.dateDebut = new Date;
        this.dateFin = new Date;
        this.formateurId = 0;
        this.formationId = 0;
        this.promotionId = 0;
        this.versionId = 0;
    }

}
