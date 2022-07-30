import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
//to hold acno of current user
acno:any
//to hold transaction array of current user
transactions:any
  constructor(private ds:DataService) { 
    //get the value of current acno from data
    this.acno = this.ds.currentAcno
    //get transaction array from data servies
    this.transactions = this.ds.getTransaction(this.acno)
    console.log(this.transactions);
    
  }

  ngOnInit(): void {
  }

}
