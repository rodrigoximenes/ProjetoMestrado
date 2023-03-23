import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MethodologyComponent } from './methodology/methodology.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'methodology', component: MethodologyComponent },
      { path: 'workflow/:stepNumber', component: WorkflowComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
