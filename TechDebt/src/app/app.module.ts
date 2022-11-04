import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MethodologyComponent } from './methodology/methodology.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MethodologyComponent,
    WorkflowComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    BrowserAnimationsModule,
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
