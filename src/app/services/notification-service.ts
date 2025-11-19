import { Injectable, signal } from '@angular/core';


export type NotificationType = 'success' | 'error' | 'warning' | 'info';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public readonly message = signal<string | null>(null);
  public readonly type= signal<NotificationType>('info');
  public readonly visible = signal(false);
  
  show(msg: string, type: NotificationType = 'info')
  {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(()=> this.close(), 3000);
  }

  close()
  {
    this.visible.set(false);
  }
}
