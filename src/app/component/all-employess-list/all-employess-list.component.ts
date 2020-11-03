import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllServiceService } from 'src/app/service/all-service.service';
import { Employee } from '../Employee';
import { Router,ActivatedRoute} from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'app-all-employess-list',
  templateUrl: './all-employess-list.component.html',
  styleUrls: ['./all-employess-list.component.css']
})
export class AllEmployessListComponent implements OnInit {
  public allEmp:ArrayBuffer;
  employees: Observable<Employee[]>;
  constructor(private service : AllServiceService,
    private router :Router,
    private notification : NotificationService) { }

    getAllEmplyoees(){
      this.service.getAll("/employees").subscribe(
        (data)=>{
          this.allEmp=data;
          console.log(this.allEmp)
        },(error)=>{
          if(error.status == 400){
            this.notification.errorAlert(error.error.message);
           
          }else if(error.status == 500){
            this.notification.showError(error.error.message,error.status);
          }
        }
      )
    }
  ngOnInit() {
    this.getAllEmplyoees();
  }
  employeeDetails(id){
    this.router.navigate(['updateemp', id]);
  }
  empId;
  delete(id){
    console.log(id)
    this.empId=id;
  }
  deleteemp(){
    this.service.deleteData("/delete/"+this.empId).subscribe(
      (data)=>{
        console.log(data);
        this.notification.successAlert("emplyoee delete sucess");
        this.getAllEmplyoees();
      },(error)=>{
        if(error.status == 400){
          this.notification.errorAlert(error.error.message);
         
        }else if(error.status == 500){
          this.notification.showError(error.error.message,error.status);
        }
      }
    );
  }
}
