import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification-service';
@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  constructor(public notify: NotificationService){}
}
