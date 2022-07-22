import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { Ville } from 'src/app/_models/ville';
import { VilleService } from 'src/app/_services/ville.service';
@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent {
  villes!: Ville[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  nombreTpMiseAjour: number;
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddIntervention: UntypedFormGroup;
  visibleAlert: boolean;
  constructor(private  villeService: VilleService , private formBuilder :FormBuilder) { 

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddIntervention = this.formBuilder.group({
      id: 0,
      slug: '',
      nom: '',
      version: 0,
    })
    this.searchExpression = '';
    this.itemsPerPage = 6;
    this.currentPage = 1;
    this.totalItems = 0;
    this.nombreTpMiseAjour = 0;
    this.visibleAlert = false;
    this.getVilleList();
  }

get f() { return this.searchForm.controls; }
get formUser() { return this.formAddIntervention.controls }
get formUserValue() { return this.formAddIntervention.value }

getVilleList() {
  this.villeService.count(this.searchExpression).pipe(first()).subscribe({
    next: (countDto) => {
      this.totalItems = countDto.nb;
      console.log(this.totalItems)
    },
    error: error => {
      console.log(error)
    }

  })

  this.villeService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(villes => {
    this.villes = villes;
  })
}
onSubmit() {
  this.searchExpression = this.f['search'].value;
  this.getVilleList();
}
pageChanged(page: number) {
  this.currentPage = page;
  this.getVilleList();
}
UpdateDg2(){
  this.villeService.updateDg2().pipe(first()).subscribe( countDto =>{
    this.getVilleList();
    this.nombreTpMiseAjour = countDto.nb;
    this.visibleAlert = true;
    setTimeout(() => {
      this.visibleAlert = false;
    }, 8000);
  })
}
   }




