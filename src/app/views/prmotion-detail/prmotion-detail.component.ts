import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { BlocCompetences } from 'src/app/_models/blocCompetences';
import { Epreuve } from 'src/app/_models/epreuve';
import { Etudiant } from 'src/app/_models/etudiant';
import { Promotion } from 'src/app/_models/promotion';
import { BlocCompetencesService } from 'src/app/_services/blocCompetences.service';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { EvaluationService } from 'src/app/_services/evaluation.service';
import { GeneratorService } from 'src/app/_services/generator.service';
import { saveAs } from 'file-saver';

import { Evaluation } from 'src/app/_models/evaluation';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-prmotion-detail',
  templateUrl: './prmotion-detail.component.html',
  styleUrls: ['./prmotion-detail.component.scss']
})
export class PrmotionDetailComponent {
  formEvaluation: UntypedFormGroup;
  etudiants!: Etudiant[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  promotionId: number;
  promo: Promotion = new Promotion()
  blocsCompetences!: BlocCompetences[];
  epreuves!: Epreuve[];
  blocCompSelected: number = 0;
  epreuveSelectd: number = 0;
  note : number =0;
  evaluation :Evaluation = new Evaluation();
  isModifier: boolean = false;
  constructor(private formBuilder: UntypedFormBuilder, private promotionService: PromotionService, private etudiantService: EtudiantService, private route: ActivatedRoute, private blocCompetencesService: BlocCompetencesService, private epreuveService: EpreuveService,
    private evaluationService: EvaluationService ,private generatorService : GeneratorService) {

    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.promotionId = 0
    this.route.params.subscribe(params => this.promotionId = params['idPromo'])
    this.formEvaluation = this.formBuilder.group({
      id : 0,
      etudiantId :0,
      epreuveId :0,
      version :0,
      note :0
    })
    this.getAllEtudiants()
    this.getPromotion()
  }
  get formEval(){return this.formEvaluation.controls}
  getAllEtudiants() {
    this.etudiantService.getAllByPrmoId(this.promotionId).pipe(first()).subscribe(etudiants => {
      this.etudiants = etudiants;
    })
  }
  getPromotion() {
    this.promotionService.findById(this.promotionId).pipe(first()).subscribe(promo => {
      this.promo = promo
      this.getBlocCompList()
    })
  }
  getBlocCompList() {
    this.blocCompetencesService.getAllByTitreProfessionnelId(this.promo.titreProfessionnelId).pipe(first()).subscribe(blocsCompetences => {
      console.log(blocsCompetences)
      this.blocsCompetences = blocsCompetences;
    })
  }
  getEpreuvesByBlocComp(idBlocComp: number) {
    this.epreuveService.getByBlocDeCompetences(idBlocComp).pipe(first()).subscribe(
      epreuves => this.epreuves = epreuves
    )
  }
  onChange(event: any) {
    this.blocCompSelected = event;
    console.log(event)
    this.getEpreuvesByBlocComp(event)

  }
  onChangeEpreuve(event: any) {
    this.epreuveSelectd = event;
    for (let i = 0; i < this.etudiants.length; i++) {
      const etu = this.etudiants[i];
      etu.notesByEpreuve = new Map<number,Evaluation>();
     
      this.evaluationService.getByEtudaintAndEpreuve(etu.id, this.epreuveSelectd).pipe(first()).subscribe(
      
        {
          next: ep => {
            if (ep != null) {
              console.log();

              etu.notesByEpreuve.set(this.epreuveSelectd,ep)

            }
            // else{
            //   etu.notesByEpreuve.set(this.epreuveSelectd,new Evaluation())
            // }
           
          },
          error: err => {
            // etu.notesByEpreuve.set(this.epreuveSelectd,0)
            console.log(err)
          }
        }
      )

    }

  }
  ajouter(etu :Etudiant){
    let EvalToSave = Object.assign(this.evaluation, this.formEvaluation.getRawValue())
    EvalToSave.etudiantId = etu.id;
    EvalToSave.epreuveId = this.epreuveSelectd;
    this.evaluationService.save( EvalToSave).pipe(first()).subscribe(
      ()=>{
        this.onChangeEpreuve(this.epreuveSelectd)
      }
    )
  }
  modifier(id :number){
for (let i = 0; i < this.etudiants.length; i++) {
  const etu = this.etudiants[i];
  if(etu.id == id){
    etu.modifier = true;
    break
  }
  
}
    this.isModifier = true;

  }
  annuler(id : number){
    for (let i = 0; i < this.etudiants.length; i++) {
      const etu = this.etudiants[i];
      if(etu.id == id){
        etu.modifier = false;
        break
      }

  }}
  update(etu :Etudiant){
    
    this.annuler(etu.id)
    let EvalToSave = Object.assign(this.evaluation, this.formEvaluation.getRawValue())
    EvalToSave.etudiantId = etu.id;
    EvalToSave.epreuveId = this.epreuveSelectd;
    EvalToSave.id = etu.notesByEpreuve.get(this.epreuveSelectd)?.id
    console.log(EvalToSave)
    this.evaluationService.update( EvalToSave).pipe(first()).subscribe(
      ()=>{
        this.onChangeEpreuve(this.epreuveSelectd)
      }
    )
  }
  genererGrille(){
    this.generatorService.getGrillePositionnementl(this.promotionId).pipe(
      map((result)=>{
        saveAs(result,"Grille-de-positionnement" + this.promo.titreProfessionnelTitre + "-" +this.promo.villeNom +".pdf"
        
        ) 
      })
    ).subscribe()

    
  }
}
