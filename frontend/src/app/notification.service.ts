import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'danger' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.notificationSubject.next({ message, type });
  }

  success(message: string) { this.show(message, 'success'); }
  error(message: string) { this.show(message, 'danger'); }
}
