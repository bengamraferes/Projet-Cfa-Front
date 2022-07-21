import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { TitreProfessionnel } from 'src/app/_models/titreProfessionnel';
import { TitreProfessionnelService } from '../../_services/titreProfessionnel.service';


@Component({
  selector: 'app-titre-professionnel',
  templateUrl: './titre-professionnel.component.html',
  styleUrls: ['./titre-professionnel.component.scss']
})
export class TitreProfessionnelComponent {

  titresProfessionnels!: TitreProfessionnel[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  nombreTpMiseAjour: number;
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddIntervention: UntypedFormGroup;
  titreProfessionnel: TitreProfessionnel = new TitreProfessionnel();
  visibleAlert: boolean;
  constructor(private formBuilder : UntypedFormBuilder ,private titreProfessionnelService : TitreProfessionnelService) { 

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
    this.nombreTpMiseAjour = 0;
    this.visibleAlert = false;
    this.getTitreProsList();
  }

get f() { return this.searchForm.controls; }
get formUser() { return this.formAddIntervention.controls }
get formUserValue() { return this.formAddIntervention.value }

getTitreProsList() {
  this.titreProfessionnelService.count(this.searchExpression).pipe(first()).subscribe({
    next: (countDto) => {
      this.totalItems = countDto.nb;
      console.log(this.totalItems)
    },
    error: error => {
      console.log(error)
    }

  })

  this.titreProfessionnelService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(titresProfessionnels => {
    this.titresProfessionnels = titresProfessionnels;
  })
}
onSubmit() {
  this.searchExpression = this.f['search'].value;
  this.getTitreProsList();
}
pageChanged(page: number) {
  this.currentPage = page;
  this.getTitreProsList();
}
UpdateDg2(){
  this.titreProfessionnelService.updateDg2().pipe(first()).subscribe( countDto =>{
    this.getTitreProsList();
    this.nombreTpMiseAjour = countDto.nb;
    this.visibleAlert = true;
    setTimeout(() => {
      this.visibleAlert = false;
    }, 10000);
  })
}
}
