import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private service: ServiceService, private actroute: ActivatedRoute) { }

  id: any
  userId: any
  user: any = []
  ngOnInit(): void {
    this.actroute.queryParams.subscribe((params) => {
      this.userId = params["empId"];
      console.log(this.userId);
    })
    this.getbyid()
  }
  getbyid() {
    this.service.getdatabyid(this.userId).subscribe((res:any) => {
      this.user = res.getEmployeeDataById;
      console.warn(this.user);
    })
  }

}
