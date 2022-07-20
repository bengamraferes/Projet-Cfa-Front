export class Formation {
    id:number;
    duree: number;
    objectifsPedagogique: string;
    slug: string;
    titre:string;
    versionId: number;


    constructor(){
        this.id=0;
        this.duree = 0.0;
        this.titre ='';
        this.objectifsPedagogique = '';
        this.slug = '';
        this.versionId = 0;
    }

}