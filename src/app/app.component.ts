import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username = "";

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser() ?? "";
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}


