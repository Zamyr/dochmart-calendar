import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, getDoc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  constructor(private firestore: Firestore) { }

  getSchedules() {
    let schedulesCollection = collection(this.firestore, 'schedules-days')
    return collectionData(schedulesCollection, { idField: 'id' })
  }

  getSchedulesTime() {
    let schedulesCollection = collection(this.firestore, 'schedules-time')
    return collectionData(schedulesCollection, { idField: 'id' })
  }

  async saveSchedulesTime(idDays: string, time: string): Promise<DocumentReference<DocumentData>> {
    const schedulesTimeCollection = collection(this.firestore, 'schedules-time');
    const scheduleTimeData = {
      idDays: idDays,
      time: time,
    };

    return addDoc(schedulesTimeCollection, scheduleTimeData);
  }

  async saveSchedulesDay(day: string): Promise<string> {
    const schedulesTimeCollection = collection(this.firestore, 'schedules-days');
    const scheduleTimeData = {
      day,
    };

    // Almacenar la referencia del documento recién creado
    const docRef = await addDoc(schedulesTimeCollection, scheduleTimeData);

    // Obtener el id del DocumentReference
    const id = docRef.id;

    return id;
  }

}
