import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllServiceService } from 'src/app/service/all-service.service';
import { CustomvalidationServiceService } from 'src/app/service/customvalidation-service.service';
import { Employee } from '../Employee';
import {MatAccordion} from '@angular/material/expansion';
import { NotificationService } from 'src/app/service/notification.service';
import { Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  empProfileGroup: FormGroup;
  employee: Employee = new Employee();
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationServiceService,
    private service: AllServiceService,
    private notifyService : NotificationService,
    private router : Router) {

  }

  get createForm() {
    return this.empProfileGroup.controls;
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  onSubmit() {
    this.submitted = true;
    if (this.empProfileGroup.valid) {
      this.employee.empName=this.empProfileGroup.controls['empName'].value;
      this.employee.emailId=this.empProfileGroup.controls['email'].value;
      this.employee.phoneNumber=this.empProfileGroup.controls['phoneNumber'].value;
      this.employee.password=this.empProfileGroup.controls['password'].value;
      this.save();
    }
  
  }

  message:String;
  detailes:String;
  save(){
   
      this.service.postData("/add",this.employee).subscribe(
        (data)=>{
          console.log(data)
          this.notifyService.successAlert("You have successfully registered and logged in.");
          this.router.navigate(["welcome"]);
        },(error)=>{
          if(error.status == 400){
            this.notifyService.errorAlert(error.error.message);
           
          }else if(error.status == 500){
            this.notifyService.showError(error.error.message,error.status);
          }
        }
      );
    
  }
  ngOnInit() {

    this.empProfileGroup = this.fb.group({
      empName: ['', Validators.required, this.customValidator.userNameValidator.bind(this.customValidator)],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      cnfpwd: ['', [Validators.required]]

    }, 
      {
        validator: this.customValidator.MatchPassword('password', 'cnfpwd'),
      }

    );

  }



}
