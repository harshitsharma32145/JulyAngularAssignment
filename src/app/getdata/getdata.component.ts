import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewComponent } from '../view/view.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-getdata',
  templateUrl: './getdata.component.html',
  styleUrls: ['./getdata.component.css']
})
export class GetdataComponent implements OnInit {

  constructor(private service: ServiceService, private route: Router, public dialog: MatDialog,private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getdata()
  }

  @ViewChild(MatPaginator) private paginator!: MatPaginator

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddComponent, {
      width: '70%',
      height: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  displayedColumns: string[] = ['Name', 'dob', 'genderId', 'phonenum', 'zipcode', 'address', 'countryName', 'state', 'city', 'action'];

  value: any = []
  dataSource: any;
  res: any
  getdata() {
    this.service.getdata().subscribe((res: any) => {
      this.value = res.getEmployeeData
      console.warn(this.value);

      this.dataSource = new MatTableDataSource<any>(this.value);
      this.dataSource.paginator = this.paginator

      console.log(this.dataSource)
    })
  }
  updatedata(id: any) {
    this.route.navigate([this.dialog.open(UpdateComponent)], { queryParams: { id: id } })
  }
  view(empId: any) {
    this.route.navigate([this.dialog.open(ViewComponent)], { queryParams: { empId: empId } })
  }
  value2: any = []

  deletedata(id: any) {

    if
      (confirm("Are you sure to delete " + id.firstName + "?")) {

      this.service.delete1(id).subscribe((result) => {
     
        this.getdata()
        this._snackBar.open('deleted','ok',{
          duration:3000
        })
      })
    }
    else {
      alert("Patient not deleted!")
      
    }
  }
 
}
