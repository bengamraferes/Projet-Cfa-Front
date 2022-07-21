import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { User } from '../../_models/user';
import { InterventionService } from '../../_services/intervention.service';
import { FormationService } from '../../_services/formation.service';
import { PromotionService } from '../../_services/promotion.service';
import { UserService } from 'src/app/_services/user.service';
import { Intervention } from '../../_models/intervention'
import { Formation } from 'src/app/_models/formation';
import { Promotion } from 'src/app/_models/promotion';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent {

  visible = false;
  interventions!: Intervention[];
  formations!: Formation[];
  promotions!: Promotion[];
  formateurs!: User[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddIntervention: UntypedFormGroup;
  intrevention: Intervention = new Intervention();
  customStylesValidated = false;
  isModifier: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private interventionService: InterventionService,
    private formationService: FormationService, private prmotionService: PromotionService, private userService: UserService
  ) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddIntervention = this.formBuilder.group({
      id: 0,
      dateDebut: new Date,
      dateFin: new Date,
      formateurId: 0,
      formationId: 0,
      promotionId: 0,
    })
    this.searchExpression = '';
    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUsersList();
    this.getFormationList();
    this.getAllPrmotionList();
    this.getAllFormateursList();

  }
  get f() { return this.searchForm.controls; }
  get formUser() { return this.formAddIntervention.controls }
  get formUserValue() { return this.formAddIntervention.value }
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
  }

  getUsersList() {
    this.interventionService.countIntervention(this.searchExpression).pipe(first()).subscribe({
      next: (countDto) => {
        this.totalItems = countDto.nb;
        console.log(this.totalItems)
      },
      error: error => {
        console.log(error)
      }

    })

    this.interventionService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(interventions => {
      this.interventions = interventions;
    })
  }
  getFormationList() {
    this.formationService.getAll().pipe(first()).subscribe(formations => {
      this.formations = formations
    }

    )
  }
  getAllPrmotionList() {
    this.prmotionService.getAll().pipe(first()).subscribe(promotions => {
      this.promotions = promotions
    }
    )
  }
  getAllFormateursList() {
    this.userService.getByRole('FORMATEUR').pipe(first()).subscribe(
      formateurs => {
        this.formateurs = formateurs
      }
    )
  }
  getFormationSlug(id: number): string {

    // console.log(this.formations)
    // if (this.formations == undefined) {
    //   setTimeout( this.getFormationSlug(id), 2000);
    // }
    for (let i = 0; i < this.formations.length; i++) {
      if (this.formations[i].id == id) {
        return this.formations[i].slug
      }

    }
    return "";
  }
  getPrmotionName(id: number): string {
    // if (this.promotions == null) {
    //   setTimeout( this.getPrmotionName(id), 2000);
    // }

    for (let i = 0; i < this.promotions.length; i++) {
      if (this.promotions[i].id == id) {
        return this.promotions[i].titreProfessionnelTitre + " " + this.promotions[i].villeNom;
      }
    }
    return "";
  }
  getFormateurName(id: number): string {
    // if (this.formateurs == null) {
    //   setTimeout( this.getFormateurName(id), 2000);
    // }

    for (let i = 0; i < this.formateurs.length; i++) {
      if (this.formateurs[i].id == id) {
        return this.formateurs[i].firstName + " " + this.formateurs[i].lastName;
      }

    }
    return "";
  }
  pageChanged(page: number) {
    this.currentPage = page;
    this.getUsersList();
  }

  onSubmit() {
    this.searchExpression = this.f['search'].value;
    this.getUsersList();
  }
  addIntervention() {
    this.customStylesValidated = true;

    let interventionTosave = Object.assign(this.intrevention, this.formAddIntervention.getRawValue())
    // // userTosave = {...this.user}
    this.interventionService.save(interventionTosave).pipe(first()).subscribe({
      next: interv => {
        this.interventions?.push(interv)
        this.visible = false;
      },
      error: err => {
        console.log(err)
      }
    })
  }
  delete(id: number) {
    this.interventionService.delete(id).subscribe({
      next: response =>{
        console.log(response)
      },
     error: err=>{
       console.log(err)
     }

    })
  }
  modifier(intervention: Intervention) {

    this.formAddIntervention.setValue(
      {
        id: 0,
        dateDebut: intervention.dateDebut,
        dateFin: intervention.dateFin,
        formateurId: intervention.formateurId,
        formationId: intervention.formationId,
        promotionId: intervention.promotionId
       } )
       this.visible = true;
       this.isModifier = true;
  }
  update(){
    let interventionTosave = Object.assign(this.intrevention, this.formAddIntervention.getRawValue())

    this.interventionService.update(interventionTosave).pipe(first()).subscribe({
     next: interv => {
       this.interventions?.push(interv)
       this.visible = false;
       this.isModifier = false;
     },
     error: err => {
       console.log(err)
     }
   })
  }

  onReset1() {
    this.customStylesValidated = false;
    this.formAddIntervention = this.formBuilder.group({
      id: 0,
      dateDebut: new Date,
      dateFin: new Date,
      formateurId: 0,
      formationId: 0,
      promotionId: 0
    })
  }
}