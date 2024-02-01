import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private date: Date = new Date();
  private currYear: number = this.date.getFullYear();
  private currMonth: number = this.date.getMonth();
  private months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor() { }

  // getCalendarData(currYear: number, currMonth: number): any {
  //   const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  //   const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  //   const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  //   const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  //   const daysInMonth = [];

  //   for (let i = firstDayofMonth; i > 0; i--) {
  //     const prevMonthDay = lastDateofLastMonth - i + 1;
  //     daysInMonth.push({ day: prevMonthDay, class: 'inactive', month: currMonth - 1 });
  //   }

  //   for (let i = 1; i <= lastDateofMonth; i++) {
  //     const isToday = i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear();
  //     daysInMonth.push({ day: i, class: isToday ? 'active' : '', month: currMonth });
  //   }

  //   for (let i = lastDayofMonth; i < 6; i++) {
  //     const nextMonthDay = i - lastDayofMonth + 1;
  //     daysInMonth.push({ day: nextMonthDay, class: 'inactive', month: currMonth + 1 });
  //   }

  //   return {
  //     currentDate: `${this.months[currMonth]} ${currYear}`,
  //     daysInMonth: daysInMonth,
  //     allCurrentDate: `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}`
  //   };
  // }

  // updateMonth(increment: number): void {
  //   this.currMonth = increment === -1 ? this.currMonth - 1 : this.currMonth + 1;

  //   if (this.currMonth < 0 || this.currMonth > 11) {
  //     this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
  //     this.currYear = this.date.getFullYear();
  //     this.currMonth = this.date.getMonth();
  //   } else {
  //     this.date = new Date();
  //   }
  // }

  // getMonthIndex(monthName: string): number | undefined {
  //   return this.months.indexOf(monthName);
  // }

  // este codigo funciona
  // private currentDate: Date = new Date();

  // getCalendarData(currYear: number, currMonth: number): any {
  //   const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  //   const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  //   const daysInMonth = [];

  //   // Rellenar días del mes anterior
  //   const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  //   for (let i = firstDayofMonth - 1; i >= 0; i--) {
  //     const prevMonthDay = lastDateofLastMonth - i;
  //     daysInMonth.push({ day: prevMonthDay, class: 'inactive', month: currMonth - 1 });
  //   }

  //   // Días del mes actual
  //   for (let i = 1; i <= lastDateofMonth; i++) {
  //     const isToday = i === this.currentDate.getDate() && currMonth === this.currentDate.getMonth() && currYear === this.currentDate.getFullYear();
  //     daysInMonth.push({ day: i, class: isToday ? 'active' : '', month: currMonth });
  //   }

  //   // Rellenar días del próximo mes
  //   const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  //   for (let i = 1; i <= 6 - lastDayofMonth; i++) {
  //     daysInMonth.push({ day: i, class: 'inactive', month: currMonth + 1 });
  //   }

  //   return {
  //     currentDate: `${this.getMonthName(currMonth)} ${currYear}`,
  //     daysInMonth: daysInMonth,
  //     allCurrentDate: `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}`
  //   };
  // }

  // updateMonth(currYear: number, currMonth: number, increment: number): any {
  //   let newYear = currYear;
  //   let newMonth = currMonth + increment;

  //   if (newMonth < 0) {
  //     newMonth = 11;
  //     newYear -= 1;
  //   } else if (newMonth > 11) {
  //     newMonth = 0;
  //     newYear += 1;
  //   }

  //   return {
  //     newYear: newYear,
  //     newMonth: newMonth
  //   };
  // }

  // private getMonthName(monthIndex: number): string {
  //   const months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  //   return months[monthIndex];
  // }

  private currentDate: Date = new Date();

  getCalendarData(currYear: number, currMonth: number): any {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const daysInMonth = [];

    // Rellenar días del mes anterior
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    for (let i = firstDayofMonth - 1; i >= 0; i--) {
      const prevMonthDay = lastDateofLastMonth - i;
      daysInMonth.push({ day: prevMonthDay, class: 'inactive', month: currMonth - 1 });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === this.currentDate.getDate() && currMonth === this.currentDate.getMonth() && currYear === this.currentDate.getFullYear();
      daysInMonth.push({ day: i, class: isToday ? 'active' : '', month: currMonth });
    }

    // Rellenar días del próximo mes
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    for (let i = 1; i <= 6 - lastDayofMonth; i++) {
      const nextMonthDay = i;
      daysInMonth.push({ day: nextMonthDay, class: 'inactive', month: currMonth + 1 });
    }
    console.log({ daysInMonth });

    return {
      currentDate: `${this.getMonthName(currMonth)} ${currYear}`,
      daysInMonth: daysInMonth,
      allCurrentDate: `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}`
    };
  }

  updateMonth(currYear: number, currMonth: number, increment: number): any {
    let newYear = currYear;
    let newMonth = currMonth + increment;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    return {
      newYear: newYear,
      newMonth: newMonth
    };
  }

  private getMonthName(monthIndex: number): string {
    const months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[monthIndex];
  }

}
