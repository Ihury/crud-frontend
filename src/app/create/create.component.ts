import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ApiserviceService} from '../apiservice.service'
import { Messages } from "../assets/messages";
import { ActivatedRoute, Router } from '@angular/router';

const messages = new Messages()

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private service:ApiserviceService, private activatedRoute:ActivatedRoute, private router:Router) {}

  getParamId:any;

  cpfRegex:any = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  userForm = new FormGroup({
    nome: new FormControl("", Validators.required),
    cpf: new FormControl("", Validators.required),
    login: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    observacao: new FormControl(""),
    admin: new FormControl()
  });

  ngOnInit(): void {
    const user = JSON.parse(<string>sessionStorage.getItem("user"));
    if (!user?.admin) {
      this.router.navigate(["/login"])
      return
    }
    this.getParamId = this.activatedRoute.snapshot.paramMap.get("id");    

    if (this.getParamId) {
      this.service.getUser(this.getParamId).subscribe({
        next: (res) => {
          this.userForm = new FormGroup({
            nome: new FormControl(res.nome, Validators.required),
            cpf: new FormControl(res.cpf, Validators.required),
            login: new FormControl(res.login, Validators.required),
            senha: new FormControl(res.senha, Validators.required),
            status: new FormControl(res.status, Validators.required),
            observacao: new FormControl(res.observacao || ""),
            admin: new FormControl(res.admin)
          });
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  userSubmit() {
    if (this.userForm.valid) {  
      if (!this.userForm.value.cpf.match(this.cpfRegex)) {
        window.alert("CPF inválido!")
        return
      }
      this.service.createUser(this.userForm.value).subscribe({
        next: (res) => {
          this.router.navigate(["/"])
          window.alert("Usuário criado com sucesso!")
        },
        error: (err) => {
          if (err.status === 401) {
            if (err.error.message === "Unauthorized!") {
              window.alert("Você não tem permissão para realizar esta ação!")
            } else this.router.navigate(["/login"])
          } else if (err.status === 400) {
            if (err.error.err?.code === "ER_DUP_ENTRY") {
              if (err.error.err.sqlMessage.includes("login")) {
                window.alert("Já existe um usuário com este login!")
              } else if (err.error.err.sqlMessage.includes("cpf")) {
                window.alert("Já existe um usuário com este CPF!")
              }              
            }  
          } else {
            console.log(err)
          }
        }
      })

    } else {
      window.alert(messages.cadastro["M03"])
    }
  }

  userUpdate() {   
    if (!this.userForm.value.cpf.match(this.cpfRegex)) {
      window.alert("CPF inválido!")
      return
    } 
    if (this.userForm.valid) {
      this.service.updateUser(this.getParamId, this.userForm.value).subscribe({
        next: (res) => {
          this.router.navigate(["/"])
          window.alert("Usuário atualizado com sucesso!")
        },
        error: (err) => {
          if (err.status === 401) {
            if (err.error.message === "Unauthorized!") {
              window.alert("Você não tem permissão para realizar esta ação!")
            } else this.router.navigate(["/login"])
          } else if (err.status === 400) {
            if (err.error.err?.code === "ER_DUP_ENTRY") {
              if (err.error.err.sqlMessage.includes("login")) {
                window.alert("Já existe um usuário com este login!")
              } else if (err.error.err.sqlMessage.includes("cpf")) {
                window.alert("Já existe um usuário com este CPF!")
              }              
            }
          } else {
            console.log(err)
          }
        }
      })

    } else {
      window.alert(messages.cadastro["M03"])
    }
  }
  cpfMask(input: Event)  {
    const target = (input.target as HTMLInputElement);
    target.value = target.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2');
  }
}
