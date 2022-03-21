import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(private service:ApiserviceService, private router: Router) {}

  userAccessToken: any = sessionStorage.getItem("userAccessToken");
  user: any = JSON.parse(<string>sessionStorage.getItem("user"));
  readData:any;

  ngOnInit(): void {
    const user = JSON.parse(<string>sessionStorage.getItem("user"));
    if (!user?.admin) {
      this.router.navigate(["/login"])
      return
    }
    this.service.getAllUsers().subscribe((res) => {
        this.readData = res;
    });
  }

  clearSearch(): void {
    const search = document.getElementById("search");

    (<HTMLInputElement>search).value = "";

    this.search();
  }

  search(): void {
    const search = document.getElementById("search");
    const usuarios: NodeListOf<HTMLInputElement> = document.querySelectorAll("#usuario");

    for (let i:number = 0; i < usuarios.length; i++) {
      const user: HTMLElement = usuarios[i];
      const userName = user.querySelector("#nome #value")
      const userCpf = user.querySelector("#cpf #value")
      const userLogin = user.querySelector("#login #value")

      if ((<HTMLInputElement>search).value.length === 0) {
        user.style.display = "block";
      } else {
        if (
          (<string>userName?.textContent).toLowerCase().includes((<HTMLInputElement>search).value.toLowerCase()) ||
          (<string>userCpf?.textContent).toLowerCase().includes((<HTMLInputElement>search).value.toLowerCase()) ||
          (<string>userLogin?.textContent).toLowerCase().includes((<HTMLInputElement>search).value.toLowerCase())
          ) {
          user.style.display = "block";
        } else {
          user.style.display = "none";
        }
      }
      
    }
  }
}
