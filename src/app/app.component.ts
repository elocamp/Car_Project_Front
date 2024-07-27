import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sellcar_angular';
  sidebarOpen = false;

  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isCostumerLoggedIn: boolean = StorageService.isCostumerLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus() {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isCostumerLoggedIn = StorageService.isCostumerLoggedIn();
  }

  logout() {
    StorageService.signout();
    this.updateLoginStatus();
    this.router.navigateByUrl("/login");
  }
}
