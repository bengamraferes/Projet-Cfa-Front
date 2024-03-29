import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () =>
          import('./views/utilisateur/utilisateur.module').then((m) => m.UtilisateurModule)
      },
      {
        path: 'etudiants',
        loadChildren: () =>
          import('./views/etudiant/etudiant.module').then((m) => m.EtudiantModule)
      },
      {
        path:'titreProfessionnel',
      loadChildren: ( ) => 
        import('./views/titre-professionnel/titre-professionnel.module').then((m)=>m.TitreProfessionnelModule)
     
        
      },
      {
        path:'formation',
      loadChildren: ( ) => 
        import('./views/formation/formation.module').then((m)=>m.FormationModule)

      },
      {
        path:'blocCompetences/:idTitrePro',
      loadChildren: ( ) => 
        import('./views/bloc-Competences/bloc-Competences.module').then((m)=>m.BlocCompetencesModule)
        
      },
      {
        path:'detailPromo/:idPromo',
      loadChildren: ( ) => 
        import('./views/prmotion-detail/prmotion-detail.module').then((m)=>m.PrmotionDetailModule)
        
      },
      {
        path:'detailIntervention/:idIntervention',
      loadChildren: ( ) => 
        import('./views/intervention-detail/intervention-detail.module').then((m)=>m.InterventionDetailModule)
        
      },
      {
        path:'ville',
      loadChildren: ( ) => 
        import('./views/ville/ville.module').then((m)=>m.VilleModule )

      },
      {
        path:'promotion',
      loadChildren: ( ) => 
        import('./views/promotion/promotion.module').then((m)=>m.PromotionModule )

      },
      {
        path:'intervention',
      loadChildren: ( ) => 
        import('./views/intervention/intervention.module').then((m)=>m.InterventionModule )

      },
      {
        path:'niveau',
      loadChildren: ( ) => 
        import('./views/niveau/niveau.module').then((m)=>m.NiveauModule )

      },
      {
        path:'epreuve',
      loadChildren: ( ) => 
        import('./views/epreuve/epreuve.module').then((m)=>m.EpreuveModule )

      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ],
    canActivate: [AuthGuard]
  },

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
