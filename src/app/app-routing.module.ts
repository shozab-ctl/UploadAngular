import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ImportWizardComponent } from './import-wizard/import-wizard.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'importWizard', component: ImportWizardComponent },
  { path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  { path: '**', component: LandingComponent }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
