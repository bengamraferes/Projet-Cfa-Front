import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { Etudiant } from '../../_models/etudiant';
import { EtudiantService } from '../../_services/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent {

  visible = false;
  etudiants!: Etudiant[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  formAddUser: FormGroup;
  etudiant : Etudiant = new Etudiant();
  customStylesValidated = false;
  isModifier : boolean = false;

  constructor(private formBuilder: FormBuilder, private etudiantService: EtudiantService) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddUser = this.formBuilder.group({
      id:0,
      firstName:'',
      lastName:'',
      password: '',
      email:'',
      role: 'ETUDIANT',
      active: '',
      // imagePath:''
    })
    this.searchExpression = '';
    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUsersList();

  }
  get f() { return this.searchForm.controls; }
  get formUser(){return this.formAddUser.controls}
  get formUserValue(){return this.formAddUser.value}
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
    this.isModifier = false;
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
  addUser(){
    this.customStylesValidated = true;
   
    // let userTosave = Object.assign(this.user, this.formAddUser.getRawValue())
    // // userTosave = {...this.user}
    // this.userService.save(userTosave).pipe(first()).subscribe({
    //   next: user =>{
    //     this.users?.push(user);
    //   },
    //   error: err=>{
    //     console.log(err)
    //   }
    // })
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

    this.formAddUser.setValue(
      {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email:user.email,
        role: user.role,
        active: user.active,
       } )
       this.visible = true;
       this.isModifier = true;
  }

  onReset1() {
    this.customStylesValidated = false;
    this.formAddUser = this.formBuilder.group({
      firstName:'',
      lastName:'',
      password: '',
      email:'',
      role: '',
      active: '',
      // imagePath:''
    })
    console.log('Reset... 1');
  }

}
