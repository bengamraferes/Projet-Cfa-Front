import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { BlocCompetences } from 'src/app/_models/blocCompetences';
import { BlocCompetencesService } from 'src/app/_services/blocCompetences.service';
import { EpreuveService } from 'src/app/_services/epreuve.service';
import { TitreProfessionnelService } from 'src/app/_services/titreProfessionnel.service';
import { Epreuve,Type } from '../../_models/epreuve';
import { TitreProfessionnel } from 'src/app/_models/titreProfessionnel';

@Component({
  selector: 'app-epreuve',
  templateUrl: './epreuve.component.html',
  styleUrls: ['./epreuve.component.scss']
})
export class EpreuveComponent  {

  visible = false;
  epreuves!: Epreuve[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddEpreuve: UntypedFormGroup;
  epreuve: Epreuve = new Epreuve();
  customStylesValidated = false;
  isModifier: boolean = false;
  blocsCompetences!: BlocCompetences[];
  titresProfessionnels!: TitreProfessionnel[];

  titreProId: number =0;
  isTitreProSelected = false;
  selectedDevice :string = "";
  types :string[] ;


  constructor(private formBuilder: UntypedFormBuilder, private epreuveService: EpreuveService,private titreProfessionnelService : TitreProfessionnelService,

    private blocCompetencesService: BlocCompetencesService
  ) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddEpreuve = this.formBuilder.group({
      id: 0,
      description: '',
      titre: '',
      version : 0,
      blocCompetencesId : 0,
      type : null,
      titreProfessionnelId : 0
    })
    this.types  = [Type.QCM,Type.MES]
    this.searchExpression = '';
    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getEpreuveList();
    this.getTitreProsList()
  }
  get f() { return this.searchForm.controls; }
  get formUser() { return this.formAddEpreuve.controls }
  get formUserValue() { return this.formAddEpreuve.value }
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
  }
  getTitreProsList() {
    this.titreProfessionnelService.count("").pipe(first()).subscribe({
      next: (countDto) => {
        
        this.totalItems = countDto.nb;
        this.titreProfessionnelService.getAll(this.currentPage, this.totalItems,"").pipe(first()).subscribe(titresProfessionnels => {
          this.titresProfessionnels = titresProfessionnels;
        })
        console.log(this.totalItems)
      },
      error: error => {
        console.log(error)
      }
  
    })
  
   
  }
  getBlocCompList(itreProId:number) {
    this.blocCompetencesService.getAllByTitreProfessionnelId(itreProId).pipe(first()).subscribe(blocsCompetences => {
      console.log(blocsCompetences)
      this.blocsCompetences = blocsCompetences;
    })
  }
  onChange(event :any) { 
    this.selectedDevice=event;
    this.isTitreProSelected = true;
    this.getBlocCompList(event);
      console.log(event)
    }

  getEpreuveList() {
    this.epreuveService.countEpreuve(this.searchExpression).pipe(first()).subscribe({
      next: (countDto) => {
        this.totalItems = countDto.nb;
        console.log(this.totalItems)
      },
      error: error => {
        console.log(error)
      }

    })

    this.epreuveService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(epreuves => {
      this.epreuves = epreuves;
    })
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getEpreuveList();
  }

  onSubmit() {
    this.searchExpression = this.f['search'].value;
    this.getEpreuveList();
  }
  addEpreuve() {
    this.customStylesValidated = true;
    console.log(this.formAddEpreuve.getRawValue());
    let epreuveTosave = Object.assign(this.epreuve, this.formAddEpreuve.getRawValue())
    // // userTosave = {...this.user}
    this.epreuveService.save(epreuveTosave).pipe(first()).subscribe({
      next: ep => {
        this.epreuves?.push(ep)
        this.visible = false;
        this.searchExpression = ep.titre
        this.getEpreuveList()
      },
      error: err => {
        console.log(err)
      }
    })
  }
  delete(id: number) {
    this.epreuveService.delete(id).subscribe({
      next: response =>{
        this.getEpreuveList()
        console.log(response)
      },
     error: err=>{
       console.log(err)
     }

    })
  }
  modifier(ep: Epreuve) {

    this.formAddEpreuve.setValue(
      {
        id: ep.id,
        description: ep.description,
        titre: ep.titre,
        version : ep.version,
        blocCompetencesId : ep.blocCompetencesId,
        type : ep.type,
        titreProfessionnelId : 0
      
       } )
       this.visible = true;
       this.isModifier = true;
  }
  update(){
    let epreuveTosave = Object.assign(this.epreuve, this.formAddEpreuve.getRawValue())
    this.epreuveService.update(epreuveTosave).pipe(first()).subscribe({
     next: ep => {
       this.epreuves?.push(ep)
       this.visible = false;
       this.isModifier = false;
       this.searchExpression = ep.titre
       this.getEpreuveList()
     },
     error: err => {
       console.log(err)
     }
   })
  }

  onReset1() {
    this.customStylesValidated = false;
    this.formAddEpreuve = this.formBuilder.group({
      id: 0,
      description: '',
      titre: '',
      version : 0,
      blocCompetencesId : 0,
      type : null,
      titreProfessionnelId : 0
    })
  }

}
