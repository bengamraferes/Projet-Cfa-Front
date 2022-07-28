import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { Etudiant } from 'src/app/_models/etudiant';
import { Promotion } from 'src/app/_models/promotion';
import { TitreProfessionnel } from 'src/app/_models/titreProfessionnel';
import { Ville } from 'src/app/_models/ville';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { TitreProfessionnelService } from 'src/app/_services/titreProfessionnel.service';
import { VilleService } from 'src/app/_services/ville.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent{
  dropdownList = [];
  dropdownSettings:IDropdownSettings={};

  visible = false;
  // etudiants!: Etudiant[];
  promotions!: Promotion[];
  etudiants! : Etudiant[];
  titresPro! : TitreProfessionnel[];
  villes! : Ville[];
  promotion : Promotion = new Promotion();

  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalItemsEtudiants: number;
  totalItemsVille: number;
  totalItemsTitrePro: number;

  searchExpression: string;
  searchForm: UntypedFormGroup;
  formAddPromo: UntypedFormGroup;
  customStylesValidated = false;
  isModifier : boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private etudiantService: EtudiantService, private prmotionService: PromotionService,
    private villeService: VilleService , private titreProService: TitreProfessionnelService
) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddPromo = this.formBuilder.group({
      id: 0,
      dateDebut:  null,
      dateFin:  null,
      titreProfessionnelId: null,
      villeId: '',
      villeNom : '',
      titreProfessionnelTitre : '',
      etudiantsId:null,
      version: 0,
    })
    this.searchExpression = '';
    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.totalItemsEtudiants = 0;
    this.totalItemsTitrePro = 0 ;
    this.totalItemsVille = 0;
    this.getAllPrmotionList()
    this.getAllEtudiantList()
    this.getAllTitreProList()
    this.getAllVilleList()
    this.dropdownSettings = {
      idField: 'id',
      textField: 'firstName',
    };
  }
  get f() { return this.searchForm.controls; }
  get formUser(){return this.formAddPromo.controls}
  get formUserValue(){return this.formAddPromo.value}
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
  }
  getAllPrmotionList() {
    this.prmotionService.countPromotion(this.searchExpression).pipe(first()).subscribe({
      next:(countDto)=>{
              this.totalItems = countDto.nb;
              console.log(this.totalItems)
            },
            error: error =>{
              console.log(error)
            }
    })

    this.prmotionService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(promotions => {
      this.promotions = promotions
      console.log(promotions)
    }
    )
  }
  getAllEtudiantList() {
    this.etudiantService.countUsers("").pipe(first()).subscribe({
      next:(countDto)=>{
              
              this.etudiantService.getAll(1, countDto.nb +1, "").pipe(first()).subscribe(etus => {
                this.etudiants = etus
              }
              )
            },
            error: error =>{
              console.log(error)
            }
    })
   
  }
  getAllVilleList() {
    this.villeService.count("").pipe(first()).subscribe({
      next:(countDto)=>{
              
              this.villeService.getAll(1, countDto.nb +1, "").pipe(first()).subscribe(villes => {
                this.villes = villes
              }
              )
            },
            error: error =>{
              console.log(error)
            }
    })}

    getAllTitreProList() 
    {
      this.titreProService.count("").pipe(first()).subscribe({
        next:(countDto)=>{
                
                this.titreProService.getAll(1, countDto.nb +1, "").pipe(first()).subscribe(titresPro => {
                  this.titresPro = titresPro
                }
                )
              },
              error: error =>{
                console.log(error)
              }
      })
   
    }
  // getUsersList() {
  //   this.etudiantService.countUsers(this.searchExpression).pipe(first()).subscribe({
  //     next:(countDto)=>{
  //       this.totalItems = countDto.nb;
  //       console.log(this.totalItems)
  //     },
  //     error: error =>{
  //       console.log(error)
  //     }
    
  //   })

  //   this.etudiantService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(etudiants => {
  //     this.etudiants = etudiants;
  //   })
  // }

  pageChanged(page: number) {
    this.currentPage = page;
    this.getAllPrmotionList();
  }

  onSubmit() {
    this.searchExpression = this.f['search'].value;
    this.getAllPrmotionList();
  }
  addPromo(){
    this.customStylesValidated = true;
 
    let promoTosave = Object.assign(this.promotion, this.formAddPromo.getRawValue())
    let etudiantsId = new Array({
      'id': 0,
      'firstName': ''
    })
    
    etudiantsId = promoTosave.etudiantsId;
    promoTosave.etudiantsId = etudiantsId.map( e=> e.id);
    console.log(promoTosave)
    this.prmotionService.save(promoTosave).pipe(first()).subscribe({
      next: promo =>{
        this.visible = false;
        this.searchForm.setValue(
          {
            search: [promo.titreProfessionnelTitre]
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
    this.prmotionService.delete(id).subscribe({
      next: response =>{
        console.log(response)
      },
     error: err=>{
       console.log(err)
     }
      
    })
  }
  modifier( promo:Promotion){
// reformuler le tablesu etudiantsId à la forme {
    //   'id': 0,
    //   'firstName': ''
    // }
    this.formAddPromo.setValue(
      {
        id: promo.id,
      dateDebut:  promo.dateDebut,
      dateFin:  promo.dateFin,
      titreProfessionnelId: promo.titreProfessionnelId,
      villeId: promo.villeId,
      villeNom : promo.villeNom,
      titreProfessionnelTitre : promo.titreProfessionnelTitre,
      etudiantsId: promo.etudiantsId,
      version: promo.version,
       } )
       this.visible = true;
       this.isModifier = true;
  }
  update(){
    let promoTosave = Object.assign(this.promotion, this.formAddPromo.getRawValue())
    console.log(promoTosave)

    this.prmotionService.update(promoTosave).pipe(first()).subscribe({
     next: (promo) => {
  
       this.visible = false;
       this.isModifier = false;
       this.searchForm.setValue(
        {
          search: [promo.titreProfessionnelTitre]
        }
       )
       setTimeout(() =>  this.onSubmit(), 500);
     },
     error: err => {
       console.log(err)
     }
   })
  }
  voir(promo : Promotion){
    // this.etudiantModal = etu;
    // if (this.etudiantModal != null) {
    //   this.promotionsEtudiant = this.promotions.filter(p=>p.id in etu.promotionsId)
    // }
  }
 
  onReset1() {
    this.customStylesValidated = false;
    this.formAddPromo = this.formBuilder.group({
      id: 0,
      dateDebut:  new Date,
      dateFin:  new Date,
      titreProfessionnelId: 0,
      villeId: '',
      villeNom : '',
      titreProfessionnelTitre : '',
      etudiantsId:[0],
      version: 0,
    })
  }
}
