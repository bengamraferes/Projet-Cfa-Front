import { Component} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { Promotion } from 'src/app/_models/promotion';
import { PromotionService } from 'src/app/_services/promotion.service';
import { Etudiant } from '../../_models/etudiant';
import { EtudiantService } from '../../_services/etudiant.service';
import {GeneratorService } from '../../_services/generator.service';
import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent {

  visible = false;
  etudiants!: Etudiant[];
  promotions!: Promotion[];
  promotionsEtudiant! : Promotion[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddEtudiant: UntypedFormGroup;
  etudiant : Etudiant = new Etudiant();
  etudiantModal : Etudiant = new Etudiant();
  customStylesValidated = false;
  isModifier : boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private etudiantService: EtudiantService, private prmotionService: PromotionService,
private generatorSevice: GeneratorService) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddEtudiant = this.formBuilder.group({
      id:0,
      firstName:'',
      lastName:'',
      password: '',
      email:'',
      role: 'ETUDIANT',
      active: 'OUI',
      promotionsId:[0]
      // imagePath:''
    })
    this.searchExpression = '';
    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUsersList();
    this.getAllPrmotionList()
  }
  get f() { return this.searchForm.controls; }
  get formUser(){return this.formAddEtudiant.controls}
  get formUserValue(){return this.formAddEtudiant.value}
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
  }
  getAllPrmotionList() {
    this.prmotionService.getAll().pipe(first()).subscribe(promotions => {
      this.promotions = promotions
      console.log(promotions)
    }
    )
  }
  getUsersList() {
    this.etudiantService.countUsers(this.searchExpression).pipe(first()).subscribe({
      next:(countDto)=>{
        this.totalItems = countDto.nb;
        console.log(this.totalItems)
      },
      error: error =>{
        console.log(error)
      }
    
    })

    this.etudiantService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(etudiants => {
      this.etudiants = etudiants;
    })
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getUsersList();
  }

  onSubmit() {
    this.searchExpression = this.f['search'].value;
    this.getUsersList();
  }
  addEtudiant(){
    this.customStylesValidated = true;
   
    let etudaintTosave = Object.assign(this.etudiant, this.formAddEtudiant.getRawValue())
    // userTosave = {...this.user}
    this.etudiantService.save(etudaintTosave).pipe(first()).subscribe({
      next: etu =>{
        this.visible = false;
        this.searchForm.setValue(
          {
            search: [etu.firstName]
          }
         )
         this.onSubmit()
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  delete(id:number){
    this.etudiantService.delete(id).subscribe({
      next: response =>{
        console.log(response)
      },
     error: err=>{
       console.log(err)
     }
      
    })
  }
  modifier( user:Etudiant){

    this.formAddEtudiant.setValue(
      {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email:user.email,
        role: user.role,
        active: user.active,
        promotionsId:user.promotionsId
       } )
       this.visible = true;
       this.isModifier = true;
  }
  update(){
    let etudiantTosave = Object.assign(this.etudiantService, this.formAddEtudiant.getRawValue())

    this.etudiantService.update(etudiantTosave).pipe(first()).subscribe({
     next: (etu) => {
  
       this.visible = false;
       this.isModifier = false;
       this.searchForm.setValue(
        {
          search: [etu.firstName]
        }
       )
       setTimeout(() =>  this.onSubmit(), 500);
     },
     error: err => {
       console.log(err)
     }
   })
  }
  voir(etu : Etudiant){
    this.etudiantModal = etu;
    if (this.etudiantModal != null) {
      this.promotionsEtudiant = this.promotions.filter(p=>p.id in etu.promotionsId)
    }
  }
  generer(idPromo : number){
    this.generatorSevice.getBultinEval(idPromo,this.etudiantModal.id).pipe(
      map((result) => {
               console.log(result);
               
                    saveAs(result,"nom.pdf")              
              })
      // getCsvReport(jobId): Observable<Object> {
      //   const header = { Accept: "application/octet-stream" };
      //   let endpoint: string = `${Endpoints.REPORT}jobs/${jobId}/filePath?`;
      //   return this.get(endpoint, header).pipe(
      //     map(report => {
      //     const a = document.createElement('a');
      //     document.body.appendChild(a);
      //     const blob: any = new Blob([report.data.parentXml], { type: 'octet/stream' });
      //     const url = window.URL.createObjectURL(blob);
      //     a.href = url;
      //     a.download = data.fileName;
      //     a.click();
      //     window.URL.revokeObjectURL(url);
      //     })
      //   );
      // }
      // downloadPDF(url: string): Observable<any> {
      //   return this.http.get<any>(url, { responseType: 'blob', observe: 'response' }).pipe(
      //     map((result:HttpResponse<Blob>) => {
      //       console.log(result);
      //       saveAs(result, "Quotation.pdf");
      //       return result;
      //     }));
      // map( report =>{
      //   console.log(report)
      // } )
    ).subscribe(response =>{
      

      console.log(response);
    })
  }
  onReset1() {
    this.customStylesValidated = false;
    this.formAddEtudiant = this.formBuilder.group({
      firstName:'',
      lastName:'',
      password: '',
      email:'',
      role: 'ETUDIANT',
      active: 'OUI',
      promotionsId:[0]
      // imagePath:''
    })
  }

}
