export class CalendarEvent {
  start: string;
  color: string;
  display: string;
  allDay: boolean;
  constructor(start: string, color: string) {
    this.start = start;
    this.color = color;
    this.display = 'background';
    this.allDay = true;
  }
}
