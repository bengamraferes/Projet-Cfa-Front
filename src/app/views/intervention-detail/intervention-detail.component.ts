import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Etudiant } from 'src/app/_models/etudiant';
import { Intervention } from 'src/app/_models/intervention';
import { Niveau } from 'src/app/_models/niveau';
import { Positionnement } from 'src/app/_models/positionnement';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { InterventionService } from 'src/app/_services/intervention.service';
import { NiveauService } from 'src/app/_services/niveau.service';
import { PositionnementService } from 'src/app/_services/positionnement.service';


@Component({
  selector: 'app-intervention-detail',
  templateUrl: './intervention-detail.component.html',
  styleUrls: ['./intervention-detail.component.scss']
})
export class InterventionDetailComponent  {
  etudiants!: Etudiant[];
  intervention: Intervention = new Intervention();
  interventionId :number = 0;
  etudiantModal : Etudiant = new Etudiant();
  formAddPositionnement: UntypedFormGroup;
  positionement :Positionnement = new Positionnement();
  niveaux!: Niveau[];
  isModifier: boolean = false;
  positionements! :Positionnement[]
  
  constructor(private router: Router,private interventionService:InterventionService,private etudiantService: EtudiantService, private route: ActivatedRoute, private positionnementService:PositionnementService, private niveauService: NiveauService,private formBuilder: UntypedFormBuilder) {
    this.route.params.subscribe(params => this.interventionId = params['idIntervention'])
    this.getIntervention()
    this.getNiveauList()
    this.getAllposi()
    this.formAddPositionnement = this.formBuilder.group({
      id : 0,
      etudiantId : 0,
      interventionId : 0,
        version : 0,
        niveauDebutId : 0,
        niveauFinId :0
    })

   }
    get formP() { return this.formAddPositionnement.controls }

   getIntervention(){
    this.interventionService.findById(this.interventionId).pipe(first()).subscribe(i=>{this.intervention =i
      this.getAllEtudiants()
    });
      
   }
   getAllEtudiants() {
    this.etudiantService.getAllByPrmoId(this.intervention.promotionId).pipe(first()).subscribe(etudiants => {
      this.etudiants = etudiants;
    })
  }
  voir(etu : Etudiant){
    this.etudiantModal = etu;
    if ( this.getPosiByIdEtu(etu.id) != null) {
      this.isModifier= true
      let posi = this.getPosiByIdEtu(etu.id)
      this.modifier(posi)
    }
    // if (this.etudiantModal != null) {
    //   this.promotionsEtudiant = this.promotions.filter(p=>p.id in etu.promotionsId)
    // }
  }
  getNiveauList() {
    this.niveauService.getAll().pipe(first()).subscribe(niveaux => {
      this.niveaux = niveaux
    }

    )
  }
  getAllposi(){
    this.positionnementService.getAllByInterventionId(this.interventionId).pipe(first()).subscribe(ps => this.positionements = ps)
  }
  getPosiByIdEtu (id:number) {
    for (let i = 0; i < this.positionements.length; i++) {
      const e = this.positionements[i];
      if (e.etudiantId = id) {
        return e
        
      }

    }
    return null;
  }
  addPositionnement() {
    let PositionnementTosave = Object.assign(this.positionement, this.formAddPositionnement.getRawValue())
    PositionnementTosave.etudiantId = this.etudiantModal.id;
    PositionnementTosave.interventionId = this.interventionId;
    console.log(this.formAddPositionnement.getRawValue())
    this.positionnementService.save(PositionnementTosave).pipe(first()).subscribe({
      next: pos => {
       console.log(pos)
     
      },
      error: err => {
        console.log(err)
      }
    })
  }
  modifier(posi: Positionnement| null) {

    if (posi != null) {
      this.formAddPositionnement.setValue(
        {
          id: posi.id,
          version: posi.version,
          etudiantId : posi.etudiantId,
          interventionId : posi.interventionId,
            niveauDebutId : posi.niveauDebutId,
            niveauFinId :posi.niveauFinId
         } )
    
         this.isModifier = true;
    }
   
  }
  update(){
    let PositionnementTosave = Object.assign(this.positionement, this.formAddPositionnement.getRawValue())
    PositionnementTosave.etudiantId = this.etudiantModal.id;
    PositionnementTosave.interventionId = this.interventionId;
    console.log(this.formAddPositionnement.getRawValue())
    this.positionnementService.update(PositionnementTosave).pipe(first()).subscribe({
      next: pos => {
       console.log(pos)
       window.location.reload()
      //  this.router.navigate(['Intervention-Detail'],{queryParams : this.route.params});
      },
      error: err => {
        console.log(err)
      }
    })
}
}
