import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  userId: any;


  constructor(private service: ServiceService, private fb: FormBuilder, private actroute: ActivatedRoute, private dialog: MatDialog,private snackbar:MatSnackBar,private _route:Router) { }
  Updaterecord !: FormGroup;
  ngOnInit(): void {
    this.Updaterecord = this.fb.group({
      empId: new FormControl(''),
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
      // countryName:new FormControl('')
    })
    this.actroute.queryParams.subscribe((params) => {
      this.userId = +params["id"];
      console.log(this.userId);
    })
    this.getemployeebyid()
    this.showgender()
    this.getcoutrydata()
  }
  data: any
 
  value1: any = []
  showgender() {
    this.service.gender().subscribe((res) => {
      this.value1 = res
      console.warn(this.value1);
    })
  }
  countryvalue: any = []
  getcoutrydata() {
    this.service.getcountry().subscribe((res: any) => {
      this.countryvalue = res.getCountryViews
      this.getstatedata(this.countryvalue[0].countryId)
      console.log(this.countryvalue);

    })
  }
  statedata: any = []
  getstatedata(id: any) {
    this.service.getstatebyid(id).subscribe((res:any) => {
      this.statedata = res.stateResponsedata;
      // this.getcitydata(this.statedata[0].stateId)
      this.Updaterecord.controls['stateId'].setValue(this.statedata.countryId);
      console.log(this.statedata);
    })
  }
  citydata: any = []
  getcitydata(id: any) {
    this.service.getcitybyid(id).subscribe((res: any) => {
      this.citydata = res.getCityViews
      
    })
  }
  getemployeebyid() {
    this.service.getdatabyid(this.userId).subscribe((res: any) => {
      this.data = res.getEmployeeDataById
      this.Updaterecord.patchValue(this.statedata)
      console.warn(this.data);

      this.Updaterecord.patchValue(this.data)
    })
  }
  cancel1() {
    this.dialog.closeAll()
  }

  value: any
  UpdateEmployee(val: any) {
    val.empId = this.userId

    if (confirm("Confirm update Patient details?")) {
      this.service.update(val).subscribe((res) => {
        //   this.value = res
        console.warn(this.value);
        this.dialog.closeAll()
        // window.location.reload()
        this._route.navigate(['getdata'])
        this.snackbar.open('value is updated','ok',{
          duration:3000
        })
       
      })
    }
  }
  

}
