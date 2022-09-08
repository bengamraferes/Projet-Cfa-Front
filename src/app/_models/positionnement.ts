export class Positionnement {
    id: number;
    etudiantId: number;
    interventionId : number;
    niveauDebutId : number;
    niveauFinId : number;
    version: number;
    constructor() {
        this.id = 0;
        this.interventionId = 0;
        this.niveauDebutId = 0;
        this.version = 0;
        this.etudiantId = 0;
        this.niveauFinId = 0;
    }

}
