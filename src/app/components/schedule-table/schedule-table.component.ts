import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DeliverService } from 'src/app/deliver.service';

interface ScheduleTime {
  idDays: string;
  time: string;
  id: string;
}

interface Schedule {
  day: string;
  id: string;
}

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent {

  // Recibimos la fecha seleccionada desde el componente padre
  @Input() selectedDate!: string;
  @Input() currentDateSelected!: string;
  @Input() getCurrentTime!: ScheduleTime[];
  schedules: Schedule[] = [];
  selectedTime: string | null = null;

  // Define los horarios de 7am a 6pm
  timeSlots: string[] = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  constructor(private service: DeliverService, private cdr: ChangeDetectorRef) { }

  confirmOrder(time: string): void {
    this.selectedTime = time;
  }

  getAvailabilityClass(timeSlot: string): string {
    console.log({ timeSlot });

    const matchingTime = this.getCurrentTime.find(time => time.time === timeSlot.split(':')[0]);
    return matchingTime ? 'full' : 'clear';
  }

  async sendOrder() {
    try {
      if (!this.selectedTime) {
        console.error('No se ha seleccionado una hora para enviar el pedido');
        return;
      }

      const formattedTime = this.selectedTime.split(':')[0];
      let getIdDays = '';

      if (this.getCurrentTime && this.getCurrentTime.length > 0) {
        const firstItem = this.getCurrentTime[0];

        if (firstItem.idDays) {
          getIdDays = firstItem.idDays;
          await this.service.saveSchedulesTime(getIdDays, formattedTime);
        }
      } else {
        await this.fetchSchedules();

        const getCurrentDate = this.schedules.find(schedule => {
          const scheduleDate = schedule.day.replace(/"/g, '');
          return scheduleDate === this.currentDateSelected;
        });

        if (getCurrentDate && getCurrentDate.id !== '') {
          await this.service.saveSchedulesTime(getCurrentDate.id, formattedTime);
        } else {
          const newScheduleId = await this.service.saveSchedulesDay(this.currentDateSelected);
          await this.service.saveSchedulesTime(newScheduleId, formattedTime);
        }
      }

      // Refrescar los datos después de la actualización
      this.selectedTime = null;
      // await this.refreshSchedules();
      await this.refreshSchedulesTime()
      // Forzar la detección de cambios
      this.cdr.detectChanges();
      // this.getAvailabilityClass()
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  }

  async fetchSchedules(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.service.getSchedules().subscribe((res) => {
        this.schedules = res as Schedule[];
        resolve();
      });
    });
  }

  // async refreshSchedules(): Promise<void> {
  //   // Aquí puedes recargar los datos necesarios después de la actualización
  //   await this.fetchSchedules();
  //   // También puedes agregar cualquier otra lógica de actualización aquí
  // }

  refreshSchedulesTime(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.service.getSchedulesTime().subscribe(() => {
        resolve();
      });
    });
  }



  cancelOrder(): void {
    this.selectedTime = null;
  }

}
