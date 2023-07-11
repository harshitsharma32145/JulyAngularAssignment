import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],

})
export class AddComponent {
  Addrecord!: FormGroup
  emailFromControle!: FormControl<any>
  constructor(private service: ServiceService, private formbuilder: FormBuilder, private route: Router, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.Addrecord = this.formbuilder.group({

      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      genderId: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      phonenum: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      countryId: new FormControl('', [Validators.required]),
      stateId: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),

    })
    this.getcoutrydata()
    this.showgender()
  }
  // get gendername() {
  //   return this.Addrecord.get("genderId")
  // }
  value1: any = []
  showgender() {
    this.service.gender().subscribe((res) => {
      this.value1 = res
      console.warn(this.value1);

    })
  }
  value4: any = []
  postrecord(val: any) {
    this.service.postdata(val).subscribe((res) => {
      this.value4 = res
      console.warn(this.value4);
      
    })
  }
  countryvalue: any = []
  getcoutrydata() {
    this.service.getcountry().subscribe((res: any) => {
      this.countryvalue = res.getCountryViews
      console.log(this.countryvalue);

    })
  }
  statedata: any = []
  getstatedata(id: any) {
    this.service.getstatebyid(id).subscribe((res:any) => {
      this.statedata = res.stateResponsedata
    })
  }
  citydata: any = []
  getcitydata(id: any) {
    this.service.getcitybyid(id).subscribe((res: any) => {
      this.citydata = res.getCityViews
    })
  }
  count=0
  dbclick()
  {
    if(this.count==0)
    {
      this.Addrecord.reset();
      this.count=1;
      console.log('reset called &count 0');
      
    }
    else
    if(this.count==1)
    {
     this.dialog.closeAll()
     window.location.reload()
    console.log('reset called &count1');
    
    }
  }

}
