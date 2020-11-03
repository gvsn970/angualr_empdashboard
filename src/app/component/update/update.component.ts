import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { AllServiceService } from 'src/app/service/all-service.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Employee } from '../Employee';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id;
  employee: Employee;
  constructor(private activeroute: ActivatedRoute,private router :Router,
    private service : AllServiceService,
    private notification : NotificationService) { 
    this.activeroute.params.subscribe( params =>this.id=params.id,
      );
  }
  updateEmployee() {
    this.service.updateData("/update/"+this.id, this.employee)
      .subscribe(data => {
        console.log(data);
        this.employee = new Employee();
       this.listUsers=data;
       this.employee=this.listUsers;
       this.notification.successAlert("emp data updated successfully");
       this.router.navigate(['allemp']);
      }, error => {
        if(error.status == 400){
          this.notification.errorAlert(error.error.message);
         
        }else if(error.status == 500){
          this.notification.errorAlert(error.error.message);
        }
      });
  }

  public listUsers;
  ngOnInit()  {
    this.employee = new Employee();
    this.service.getAll('/employees/'+this.id).subscribe(
      (data)=>{
          console.log(data)
          this.listUsers=data;
          this.employee=this.listUsers;
         
      },(error)=>{
        if(error.status == 400){
          this.notification.errorAlert(error.error.message);
         
        }else if(error.status == 500){
          this.notification.showError(error.error.message,error.status);
        }
      }
    )
  }
  onSubmit() {
    this.updateEmployee();    
  }


}
