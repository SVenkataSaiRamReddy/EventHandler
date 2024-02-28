import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  empRef= new FormGroup({
    id:new FormControl(),
    fname:new FormControl(),
    lname:new FormControl(),
    email:new FormControl()
  });

  employees:any;

  // it will call only once from here i am calling loadProductDetails() 
  ngOnInit(): void {
    this.loadEmployeeDetails();    
  }
  loadEmployeeDetails() {
    this.ps.loadEmployeeData();
    this.ps.loadEmployeeData().subscribe({
      next:(data:any)=>this.employees=data,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("Completed")
    })

  }
  storeEmployee(){
    let employee = this.empRef.value;
    this.ps.storeEmployeeData(employee).subscribe({
      next:(data:any)=>console.log(data),
      error:(error:any)=>console.log(error),
      complete:()=>this.loadEmployeeDetails()
    })
    this.empRef.reset();
  }

  viewDetails(employee:any){
    sessionStorage.setItem("employeeInfo",JSON.stringify(employee));
    this.router.navigate(["employee-operation"]);
  }

}