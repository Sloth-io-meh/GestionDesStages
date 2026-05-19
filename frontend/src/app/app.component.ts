import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from './notification.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestion des stages PFE';
  notifications: Notification[] = [];
  sidebarToggled = false;

  constructor(
    private notificationService: NotificationService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(n => {
      this.notifications.push(n);
      setTimeout(() => {
        this.notifications = this.notifications.filter(notif => notif !== n);
      }, 3000);
    });
  }

  toggleSidebar() {
    this.sidebarToggled = !this.sidebarToggled;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
