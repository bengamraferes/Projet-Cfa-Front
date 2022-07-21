import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { Formation } from 'src/app/_models/formation';
import { FormationService } from 'src/app/_services/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent  {

 formations!: Formation[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  nombreTpMiseAjour: number;
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddIntervention: UntypedFormGroup;
  visibleAlert: boolean;
  constructor(private formBuilder : UntypedFormBuilder ,private formationService : FormationService) { 

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
    this.itemsPerPage = 6;
    this.currentPage = 1;
    this.totalItems = 0;
    this.nombreTpMiseAjour = 0;
    this.visibleAlert = false;
    this.getFormationsList();
  }

get f() { return this.searchForm.controls; }
get formUser() { return this.formAddIntervention.controls }
get formUserValue() { return this.formAddIntervention.value }

getFormationsList() {
  this.formationService.count(this.searchExpression).pipe(first()).subscribe({
    next: (countDto) => {
      this.totalItems = countDto.nb;
      console.log(this.totalItems)
    },
    error: error => {
      console.log(error)
    }

  })

  this.formationService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(formations => {
    this.formations = formations;
  })
}
onSubmit() {
  this.searchExpression = this.f['search'].value;
  this.getFormationsList();
}
pageChanged(page: number) {
  this.currentPage = page;
  this.getFormationsList();
}
UpdateDg2(){
  this.formationService.updateDg2().pipe(first()).subscribe( countDto =>{
    this.getFormationsList();
    this.nombreTpMiseAjour = countDto.nb;
    this.visibleAlert = true;
    setTimeout(() => {
      this.visibleAlert = false;
    }, 8000);
  })
}

}
