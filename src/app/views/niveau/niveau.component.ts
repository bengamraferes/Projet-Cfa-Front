import { Component } from '@angular/core';
import { Niveau } from '../../_models/niveau'
import { NiveauService } from 'src/app/_services/niveau.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { Router } from '@angular/router';



@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent  {
  visible = false;
  niveaux!: Niveau[];
  niveau: Niveau = new Niveau();
  customStylesValidated = false;
  isModifier: boolean = false;
  formAddNiveau: UntypedFormGroup;
  color : string = "2889e9";


  constructor(private niveauService: NiveauService,private formBuilder: UntypedFormBuilder,private router: Router) {
    this.formAddNiveau = this.formBuilder.group({
      id : 0,
      description : '',
        codeCouleurHexa : '',
        version : 0,
        valeur : 0,
    })
    this.getNiveauList()
   }
   get formNiveau() { return this.formAddNiveau.controls }
   onEventEnd(event: string, data: any) :void{
    this.formAddNiveau.controls['codeCouleurHexa'].setValue(data.color.slice(1))
   }

   toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
  }
  getNiveauList() {
    this.niveauService.getAll().pipe(first()).subscribe(niveaux => {
      this.niveaux = niveaux
    }

    )
  }
  addNiveau() {
    this.customStylesValidated = true;

    let NiveauTosave = Object.assign(this.niveau, this.formAddNiveau.getRawValue())
    console.log(this.formAddNiveau.getRawValue())
    this.niveauService.save(NiveauTosave).pipe(first()).subscribe({
      next: niveau => {
        this.niveaux?.push(niveau)
        this.visible = false;
      },
      error: err => {
        console.log(err)
      }
    })
  }
  delete(id: number) {
    this.niveauService.delete(id).subscribe({
      next: response =>{
        this.getNiveauList()
        console.log(response)
      },
     error: err=>{
       console.log(err)
     }

    })
  }
  modifier(niveau: Niveau) {

    this.formAddNiveau.setValue(
      {
        id: niveau.id,
        description: niveau.description,
        codeCouleurHexa: niveau.codeCouleurHexa,
        version: niveau.version,
        valeur: niveau.valeur
     
       } )
       this.visible = true;
       this.isModifier = true;
  }
  update(){
    let interventionTosave = Object.assign(this.niveau, this.formAddNiveau.getRawValue())

    this.niveauService.update(interventionTosave).pipe(first()).subscribe({
     next: interv => {
       this.niveaux?.push(interv)
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
    this.formAddNiveau = this.formBuilder.group({
      id : 0,
      description : '',
        codeCouleurHexa : '',
        version : 0,
        valeur : 0,
    })
  }
}
