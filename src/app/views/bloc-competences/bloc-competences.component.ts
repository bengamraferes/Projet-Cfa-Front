import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { BlocCompetences } from 'src/app/_models/blocCompetences';
import {BlocCompetencesService} from '../../_services/blocCompetences.service'
import {CompetencesService} from '../../_services/competences.service'

import {faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {faEye } from '@fortawesome/free-solid-svg-icons';
import { Competences } from 'src/app/_models/competences';



@Component({
  selector: 'app-bloc-competences',
  templateUrl: './bloc-competences.component.html',
  styleUrls: ['./bloc-competences.component.scss']
})
export class BlocCompetencesComponent  {
  updateIcon = faPenToSquare;
  deleteIcon = faTrashCan;
  voirIcon = faEye;

  visible = false;
  blocsCompetences!: BlocCompetences[];
  competences!: Competences[];
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddBlocCompetences: UntypedFormGroup;
  blocCompetences : BlocCompetences = new BlocCompetences();
  blocCompetencesModal : BlocCompetences = new BlocCompetences();
  customStylesValidated = false;
  isModifier : boolean = false;
  titreProId : number;

  constructor(private formBuilder: UntypedFormBuilder, private blocCompetencesService: BlocCompetencesService, private route: ActivatedRoute,
    private competencesService : CompetencesService) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddBlocCompetences = this.formBuilder.group({
      id:0,
      titre:'',
      description:'',
      version: 0,
    })
    
    this.searchExpression = '';
    this.titreProId =0;
    this.route.params.subscribe(params =>this.titreProId = params['idTitrePro'])
    this.getBlocCompList();

  }
  get f() { return this.searchForm.controls; }
  get formUser(){return this.formAddBlocCompetences.controls}
  get formUserValue(){return this.formAddBlocCompetences.value}
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
  }

  getBlocCompList() {
    this.blocCompetencesService.getAllByTitreProfessionnelId(this.titreProId).pipe(first()).subscribe(blocsCompetences => {
      this.blocsCompetences = blocsCompetences;
    })
  }
  getBlocCompListSearch(){
    this.blocCompetencesService.getAllByTitreProfessionnelIdSearch(this.titreProId,this.searchExpression).pipe(first()).subscribe(blocsCompetences => {
      this.blocsCompetences = blocsCompetences;
    })
  }

  onSubmit() {
    this.searchExpression = this.f['search'].value;
    this.getBlocCompListSearch();
  }
  addBlocComp(){
    this.customStylesValidated = true;
   
    let blocCompToSave = Object.assign(this.blocCompetences, this.formAddBlocCompetences.getRawValue())
    blocCompToSave.titreProfessionnelId = this.titreProId
    this.blocCompetencesService.save(blocCompToSave).pipe(first()).subscribe({
      next: blocCompSaved =>{
        this.visible = false;
        this.searchForm.setValue(
          {
            search: [blocCompSaved.titre]
          }
         )
         setTimeout(() =>  this.onSubmit(), 500);
        
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  delete(id:number){
    this.blocCompetencesService.delete(id).subscribe({
      next: response =>{
        console.log(response)
        setTimeout(() =>  this.getBlocCompList(), 500);
      },
     error: err=>{
       console.log(err)
     }
      
    })
  }
  update(){
    this.customStylesValidated = true;
   
    let blocCompToSave = Object.assign(this.blocCompetences, this.formAddBlocCompetences.getRawValue())
    blocCompToSave.titreProfessionnelId = this.titreProId
    this.blocCompetencesService.update(blocCompToSave).pipe(first()).subscribe({
      next: blocCompSaved =>{
        this.visible = false;
        this.searchForm.setValue(
          {
            search: [blocCompSaved.titre]
          }
         )
         setTimeout(() =>  this.onSubmit(), 500);
        
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  modifier( blocC:BlocCompetences){

    this.formAddBlocCompetences.setValue(
      {
        id:blocC.id,
        titre:blocC.titre,
        description:blocC.description,
        version:blocC.version
       } )
       this.visible = true;
       this.isModifier = true;
  }
  getAllCompetencesByBlocdeCompetences(id : number){
    this.competencesService.getAllByBlocCompId(id).pipe(first()).subscribe(competences =>{
      this.competences = competences
    })
  }
  voir(b : BlocCompetences){
    this.blocCompetencesModal = b;
    if (this.blocCompetencesModal != null) {
      this.getAllCompetencesByBlocdeCompetences(b.id);
    }
  }
  onReset1() {
    this.customStylesValidated = false;
    this.formAddBlocCompetences = this.formBuilder.group({
      id:0,
      titre:'',
      description:'',
      version: 0,
    })
  }

}
