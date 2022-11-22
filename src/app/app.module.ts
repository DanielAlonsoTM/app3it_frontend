import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PollComponent } from './pages/poll/poll.component';
import { ResultsComponent } from './pages/results/results.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PollService } from './services/PollService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    PollComponent,
    SidebarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
