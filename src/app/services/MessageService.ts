import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(private flashMessages: FlashMessagesService) {}

  showMessage(message: string, cssClass: string, timeout: number) {
    this.flashMessages.show(`${message}`, {
      cssClass,
      timeout
    })
  };
};