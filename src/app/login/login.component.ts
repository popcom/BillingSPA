import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { TokenStorageService } from '../core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  expiretime: string = "";
  username: string = "";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser()!!;
      window.location.href = './home'
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {        
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.username);
        this.tokenStorage.saveExpireTime(data.expiration);


        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = data.username;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}