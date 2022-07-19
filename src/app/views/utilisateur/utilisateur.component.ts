import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {

  visible = false;
  users!: User[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  formAddUser: FormGroup;
  user : User = new User();
  customStylesValidated = false;
  isModifier : boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddUser = this.formBuilder.group({
      id:0,
      firstName:'',
      lastName:'',
      password: '',
      email:'',
      role: '',
      active: '',
      version: 0,
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
    console.log(this.router.url);
    this.userService.countUsers(this.searchExpression).pipe(first()).subscribe({
      next:(countDto)=>{
        this.totalItems = countDto.nb;
        console.log(this.totalItems)
      },
      error: error =>{
        console.log(error)
      }
    
    })

    this.userService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe(first()).subscribe(users => {
      this.users = users;
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
   
    let userTosave = Object.assign(this.user, this.formAddUser.getRawValue())
    // userTosave = {...this.user}
    this.userService.save(userTosave).pipe(first()).subscribe({
      next: user =>{
        this.visible = false;
        this.searchForm.setValue(
          {
            search: [user.firstName]
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
    this.userService.delete(id).subscribe({
      next: response =>{
        console.log(response)
      },
     error: err=>{
       console.log(err)
     }
      
    })
  }
  update(){
    this.customStylesValidated = true;
   
    let userTosave = Object.assign(this.user, this.formAddUser.getRawValue())

    this.userService.update(userTosave).pipe(first()).subscribe({
     next: (user) => {
       this.visible = false;
       this.isModifier = false;
       this.searchForm.setValue(
        {
          search: [user.firstName]
        }
       )
       this.onSubmit()
     },
     error: err => {
       console.log(err)
     }
   })
  }
  modifier( user:User){

    this.formAddUser.setValue(
      {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email:user.email,
        role: user.role,
        active: user.active,
        version: user.version,
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