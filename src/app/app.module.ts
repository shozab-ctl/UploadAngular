import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ImportWizardComponent } from './import-wizard/import-wizard.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ImportWizardComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule, MatButtonModule, HttpClientModule, AppRoutingModule, MatTableModule, MatFormFieldModule, MatSelectModule,BrowserAnimationsModule,
    MatCheckboxModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
