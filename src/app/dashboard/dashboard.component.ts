import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // acno = ''
  // pswd = ''
  // amount = ''
  //depositform model
 depositForm = this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
 })
  // acnol = ''
  // pswdl = ''
  // amountl = ''
  //withdrawalform model
 withdrawalForm = this.fb.group({
  acnol:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswdl:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amountl:['',[Validators.required,Validators.pattern('[0-9]*')]]
 })
  //login username
  user=""

  //share to child
  acno:any
  sDetails:any
  constructor(private router:Router ,private fb:FormBuilder,private ds: DataService) { 
    this.user = this.ds.currentUser
    this.sDetails=new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please log in')
      this.router.navigateByUrl('')
    }
  }
  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if(this.depositForm.valid){
      const result = this.ds.deposit(acno, pswd, amount)
      if (result) {
        alert(`${amount} is credited, New balance ${result}`)
      }
    }
    else{
      alert('invalid input')
    }
   
  }
  withdrawal() {
    var acno = this.withdrawalForm.value.acnol
    var pswd = this.withdrawalForm.value.pswdl
    var amount = this.withdrawalForm.value.amountl
    if(this.withdrawalForm.valid){
      const result = this.ds.withdrawal(acno, pswd, amount)
    if (result) {
      alert(`${amount} is debited, New balance ${result}`)
    }
    }
    else{
      alert('invalid input')
    }
    
  }
  logout(){
    //rmove login acno and user
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    // navigate to login page
    this.router.navigateByUrl('')
  }
  //deleteParent
  deleteparent(){
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  onCancel(){
    this.acno=''
  }
}
