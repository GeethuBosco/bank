import { Component, OnInit } from '@angular/core';

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
acno=''
pswd=''
  //database- bank
  userDetails = {
    1000:{acno:1000,username:'Neer',password:1000,balance:50000},
    1001:{acno:1001,username:'Devika',password:1001,balance:4000},
    1002:{acno:1002,username:'Ammu',password:1002,balance:6000}

  }
  //constructor
  constructor() { }

  //ngOnInint - life cycle  hook of angular
  ngOnInit(): void {
  }
  acnoChange(event:any){
    this.acno = event.target.value
    console.log(this.acno);
    
  }
  pswdChange(event:any){
    this.pswd = event.target.value
    console.log(this.pswd);
    
  }

//user defined function- should at the end of class
//(click)="login()"- in login.component.html
login(){
  alert('login clicked')
}

}
