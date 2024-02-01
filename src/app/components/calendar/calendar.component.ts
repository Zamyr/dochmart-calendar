import { Component, Renderer2 } from '@angular/core';
import { DeliverService } from 'src/app/deliver.service';
import { CalendarService } from 'src/app/calendar.service';

interface Schedule {
  day: string;
  id: string;
}

interface ScheduleTime {
  day: string;
  id: string;
  idDays: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // schedules: any = []
  schedules: Schedule[] = [];
  schedulesTime: ScheduleTime[] = [];
  getCurrentTime: any = [];
  calendarData: any = {};
  selectedDate!: string;
  formattedDate!: string;
  currYear!: number;
  currMonth!: number;

  private months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private service: DeliverService, private calendarService: CalendarService, private renderer: Renderer2) {
    this.currYear = new Date().getFullYear();
    this.currMonth = new Date().getMonth();
  }

  ngOnInit() {
    this.refreshSchedules();
    this.refreshSchedulesTime();
    this.updateCalendarData();
  }

  refreshSchedules() {
    this.service.getSchedules().subscribe((res) => {
      this.schedules = res as Schedule[];
      console.log(res);
    });
  }

  refreshSchedulesTime() {
    this.service.getSchedulesTime().subscribe((res) => {
      this.schedulesTime = res as ScheduleTime[];
      console.log(res);
    });
  }

  onPrevNextClick(increment: number): void {
    const { newYear, newMonth } = this.calendarService.updateMonth(this.currYear, this.currMonth, increment);
    this.currYear = newYear;
    this.currMonth = newMonth;
    this.updateCalendarData();
  }


  updateCalendarData() {
    this.calendarData = this.calendarService.getCalendarData(this.currYear, this.currMonth);
  }

  isSelectedDate(day: number, month: number): boolean {
    const selectedDate = `${this.currYear}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return selectedDate === this.selectedDate;
  }


  handleDateSelection(day: number, month: number): void {
    this.selectedDate = `${this.currYear}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.formatSelectedDate(day, month);



    const getCurrentDate = this.schedules.find(schedule => {
      const scheduleDate = schedule.day.replace(/"/g, ''); // Eliminar comillas dobles
      return scheduleDate === this.selectedDate;
    });

    this.getCurrentTime = this.schedulesTime.filter(scheduleTime => {
      const scheduleIdDays = scheduleTime.idDays.replace(/"/g, '')
      return scheduleIdDays === getCurrentDate?.id;
    })

  }

  formatSelectedDate(day: number, month: number): string {
    this.formattedDate = `${day.toString().padStart(2, '0')} de ${this.months[month]} de ${this.currYear}`;
    return this.formattedDate
  }







}
