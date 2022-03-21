import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("userAccessToken")) {
      this.router.navigate(["/"])
    }
  }

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (res) => {
          sessionStorage.setItem("userAccessToken", res.token)
          sessionStorage.setItem("user", JSON.stringify(res.user))
          this.router.navigate(["/"])
        },
        error: (err) => {
          if (err.status === 401) {
            window.alert("Usuário ou senha incorretos.")
          } else {
            console.log(err)
          }
        }
      })

    }
  }
}
