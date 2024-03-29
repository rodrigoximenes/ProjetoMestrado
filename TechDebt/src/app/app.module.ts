import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AboutComponent } from './about/about.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DebtComponent } from './debt/debt.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkflowComponent,
    PageNotFoundComponent,
    AboutComponent,
    DebtComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    AppRoutingModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    TextFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
