import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //string interpolation - check <nav> of login.component.html
  aim = 'Your perfect banking Partner'
  //property binding -check <input> placeholder of login.component.html
  account = 'Enter yuor account number'
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  //database- bank
  // userDetails:any = {
  //   1000:{acno:1000,username:'Neer',password:1000,balance:50000},
  //   1001:{acno:1001,username:'Devika',password:1001,balance:4000},
  //   1002:{acno:1002,username:'Ammu',password:1002,balance:6000}

  // }
  //constructor
  constructor(private fb: FormBuilder, private router: Router, private ds: DataService) { }

  //ngOnInint - life cycle  hook of angular
  ngOnInit(): void {
  }
  // acnoChange(event:any){
  //   this.acno = event.target.value
  //   console.log(this.acno);

  // }
  // pswdChange(event:any){
  //   this.pswd = event.target.value
  //   console.log(this.pswd);

  // }

  //user defined function- should at the end of class
  //(click)="login()"- in login.component.html

  login() {
    //alert('login clicked')

    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    if (this.loginForm.valid) {
      const result = this.ds.login(acno, pswd)
      if (result) {

        alert('login successfull')
        this.router.navigateByUrl('dashboard')
      }
    }
    else {
      alert('invalid input')
    }


  }

  //
  // login(a:any,p:any){
  //   //alert('login clicked')

  //   var acno=a.acno
  //   var pswd=p.pswd

  //   let userDetails=this.userDetails
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert('login successfull')
  //     }else{
  //       alert('incorrect password')
  //     }
  //   }else{
  //     alert('user dsnt exist!!!!!!!!!')
  //   }
  //}
}
