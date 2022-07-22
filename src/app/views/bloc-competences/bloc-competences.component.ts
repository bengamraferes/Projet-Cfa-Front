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

  visibleColspanModal= false;
  visible = false;
  isModalVisible = false;
  blocsCompetences!: BlocCompetences[];
  competences!: Competences[];
  searchExpression: string;
  searchExpressionCompetence: string;
  searchForm: UntypedFormGroup;
  formAddBlocCompetences: UntypedFormGroup;
  blocCompetences : BlocCompetences = new BlocCompetences();
  blocCompetencesModal : BlocCompetences = new BlocCompetences();
  competence : Competences =  new Competences();
  customStylesValidated = false;
  isModifier : boolean = false;
  isModifierModal = false;
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
    this.searchExpressionCompetence ='';
    this.titreProId =0;
    this.route.params.subscribe(params =>this.titreProId = params['idTitrePro'])
    this.getBlocCompList();

  }
  get f() { return this.searchForm.controls; }
  get formUser(){return this.formAddBlocCompetences.controls}
  get formUserValue(){return this.formAddBlocCompetences.value}
  toggleCollapse(): void {
    if (this.isModalVisible) {
      this.visibleColspanModal = !this.visibleColspanModal;
      this.isModifierModal = false
    }
    else{
      this.visible = !this.visible;
      this.isModifier = false;
    }
  }
  handleLiveChange(event :any){
    this.isModalVisible = event
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
  getcCompListSearch(){
    this.competencesService.getAllByBlocCompIdSearch(this.blocCompetencesModal.id,this.searchExpressionCompetence).pipe(first()).subscribe(competences => {
      this.competences = competences;
    })
  }
  onSubmit() {
    if (this.isModalVisible) {
      this.searchExpressionCompetence = this.f['search'].value;
      this.getcCompListSearch();
    }
    else {
      this.searchExpression = this.f['search'].value;
      this.getBlocCompListSearch();
    }
  
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
  addCompetence(){
    this.customStylesValidated = true;
   
    let compToSave = Object.assign(this.competence, this.formAddBlocCompetences.getRawValue())
    compToSave.blocCompetencesId = this.blocCompetencesModal.id;

    this.competencesService.save(compToSave).pipe(first()).subscribe({
      next: compSaved =>{
        this.visibleColspanModal = false;
        this.searchForm.setValue(
          {
            search: [compSaved.titre]
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
  deleteCompetence(id:number){
    this.competencesService.delete(id).subscribe({
      next: response =>{
        console.log(response)
        setTimeout(() =>  this.getAllCompetencesByBlocdeCompetences(this.blocCompetencesModal.id), 500);
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
  updateCompetence(){
    this.customStylesValidated = true;
   
    let compToSave = Object.assign(this.competence, this.formAddBlocCompetences.getRawValue())
    compToSave.blocCompetencesId = this.blocCompetencesModal.id;

    this.competencesService.update(compToSave).pipe(first()).subscribe({
      next: compSaved =>{
        this.visibleColspanModal = false;
        this.searchForm.setValue(
          {
            search: [compSaved.titre]
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
  modifierCompetence(comp :Competences){
    this.formAddBlocCompetences.setValue(
      {
        id:comp.id,
        titre:comp.titre,
        description:comp.description,
        version:comp.version
       } )
       this.visibleColspanModal = true;
       this.isModifierModal = true;
  }
  
  getAllCompetencesByBlocdeCompetences(id : number){
    console.log(id)
    this.competencesService.getAllByBlocCompId(id).pipe(first()).subscribe(competences =>{
      console.log(competences)
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
