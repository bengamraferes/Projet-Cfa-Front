import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Etudiant } from 'src/app/_models/etudiant';
import { EtudiantService } from 'src/app/_services/etudiant.service';

@Component({
  selector: 'app-prmotion-detail',
  templateUrl: './prmotion-detail.component.html',
  styleUrls: ['./prmotion-detail.component.scss']
})
export class PrmotionDetailComponent  {
  etudiants! : Etudiant[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  promotionId : number;
  constructor(private etudiantService : EtudiantService,private route: ActivatedRoute) { 

    this.itemsPerPage = 3;
    this.currentPage = 1;
    this.totalItems = 0;
    this.promotionId = 0
    this.route.params.subscribe(params =>this.promotionId = params['idPromo'])

  }
  getAllEtudiants(){
    this.etudiantService.getAllByPrmoId(this.promotionId).pipe(first()).subscribe(etudiants =>{
    this.etudiants = etudiants;
    })
  }
}
