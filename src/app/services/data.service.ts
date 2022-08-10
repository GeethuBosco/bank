import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //login username
  currentUser:any

  //login acno
  currentAcno:any
  //database- bank
  userDetails: any = {
    1000: { acno: 1000, username: 'Neer', password: 1000, balance: 50000,transaction:[] },
    1001: { acno: 1001, username: 'Devika', password: 1001, balance: 4000,transaction:[] },
    1002: { acno: 1002, username: 'Ammu', password: 1002, balance: 6000,transaction:[]}

  }
  constructor(private http:HttpClient) { 
    this.getDetails()
  }
  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('dataBase',JSON.stringify(this.userDetails))
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
  }
  }
  //get data from local storage
  getDetails(){
    //get database
    if(localStorage.getItem('database')){ 
      this.userDetails=JSON.parse(localStorage.getItem('database') || '')
    }
    //get currentacno
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') || '')
    }
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser') || '')
    }
  }
  //register
  register(acno: any, username: any, password: any) {
    // let userDetails = this.userDetails
    // if (acno in userDetails) {
    //   return false
    // }
    // else {
    //   userDetails[acno] = {
    //     acno,
    //     username,
    //     password,
    //     balance: 0,
    //     transaction:[]
    //   }
    //   this.saveDetails()
  
    //   console.log(userDetails);
    //   return true
    // }


    //req body
    const data={
      acno,
      username,
      password
    }
    //register api - asynchronous
    return this.http.post(
      'http://localhost:3000/register',data
    )
  }


  //login
  login(acno: any, pswd: any) {
    //let userDetails = this.userDetails
    // if (acno in userDetails) {
    //   if (pswd == userDetails[acno]['password']) {
    //     this.currentUser = userDetails[acno]['username']
    //     this.currentAcno = acno
    //     this.saveDetails()
    //     return true
    //   }
    //   else {
    //     alert('incorrect password')
    //     return false
    //   }
    // }
    // else {
    //   alert('user doesnot exist!!!!!!!!!')
    //   return false
    // }
    const data={
      acno,
      pswd
    }
    //login api - asynchronous
    return this.http.post(
      'http://localhost:3000/login',data
    )
  }
  //deposit
  deposit(acno: any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    var amount = parseInt(amt)
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        userDetails[acno]['balance'] += amount
      
        userDetails[acno]['transaction'].push({
          type:'CREDIT',
          amount
        })
        this.saveDetails()
        console.log(userDetails);
        
        return userDetails[acno]['balance']
      }
      else {
        alert('incorrect password')
        return false
      }
    }
    else {
      alert('User does not exist')
      return false
    }
  }
  //withdrawal
  withdrawal(acno: any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    var amount = parseInt(amt)

    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {

        if (userDetails[acno]['balance'] > amount) {
          userDetails[acno]['balance'] -= amount
          userDetails[acno]['transaction'].push({
            type:'DEBIT',
            amount
          })
          this.saveDetails()
          console.log(userDetails);

          return userDetails[acno]['balance']
        }
        else {
          alert('Insufficient balance')
          return false
        }
      }
      else {
        alert('Incorrect password')
        return false
      }
    }
    else {
      alert('User does not exist')
      return false
    }
  }
  //transaction
  getTransaction(acno:any){
    return this.userDetails[acno]['transaction']
  }
}
