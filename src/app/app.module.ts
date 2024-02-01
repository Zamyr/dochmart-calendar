import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from "./components/menu/menu.component";
import { CalendarComponent } from './components/calendar/calendar.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DeliverService } from './deliver.service';
import { ScheduleTableComponent } from './components/schedule-table/schedule-table.component';

const firebaseConfig = {
  apiKey: "AIzaSyA-5UaS1WvntUY30IA8RKxCOkxwWRiLwCo",
  authDomain: "schedules-93982.firebaseapp.com",
  projectId: "schedules-93982",
  storageBucket: "schedules-93982.appspot.com",
  messagingSenderId: "500674741211",
  appId: "1:500674741211:web:00669be97870f6e1b05dfe"
};

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ScheduleTableComponent

  ],
  providers: [DeliverService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuComponent,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
})
export class AppModule { }
