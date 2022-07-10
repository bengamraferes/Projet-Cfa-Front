import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.formAddUser = this.formBuilder.group({
      firstName:'',
      lastName:'',
      password: '',
      email:'',
      role: '',
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
  toggleCollapse(): void {
    // @ts-ignore
    this.visible = !this.visible;
  }

  getUsersList() {
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
    console.log("TODO RECHERCHE " );
    this.searchExpression = this.f['search'].value;
    this.getUsersList();
  }
  addUser(){
    this.customStylesValidated = true;
   
    let userTosave = Object.assign(this.user, this.formAddUser.getRawValue())
    // userTosave = {...this.user}
    this.userService.save(userTosave).pipe(first()).subscribe({
      next: user =>{
        this.users?.push(user);
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  delete(id:number){
    this.userService.delete(id).subscribe({
      next: response =>{
        console.log(this.users.length)
        for (let i = 0; i < this.users.length; i++) {
         if (this.users[i].id == id) {
           this.users.splice(i,1)
           console.log(this.users.length)
           break
         }
        }
      },
     error: err=>{
       console.log(err)
     }
      
    })
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