import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { Messages } from "../assets/messages";

const messages = new Messages()

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private service:ApiserviceService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const user = JSON.parse(<string>sessionStorage.getItem("user"));
    if (!user?.admin) {
      this.router.navigate(["/login"])
      return
    }
  }

  confirm(): void {
    this.service.deleteUser((<string>this.activatedRoute.snapshot.paramMap.get("id"))).subscribe({
      next: (res) => {
        this.router.navigate(["/"])
      },
      error: (err) => {
        if (err.status === 401) {
          if (err.error.message === "Unauthorized!") {
            window.alert("Você não tem permissão para realizar esta ação!")
          } else this.router.navigate(["/login"])
        } else {
          console.log(err)
        }
      }
    })
  }
}
