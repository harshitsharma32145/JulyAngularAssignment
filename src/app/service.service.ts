import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getdata() {
    return this.http.get("http://localhost:5086/api/EmployeRecord/GetAllData");
  }
  getdatabyid(id:any)
  {
    return this.http.get('http://localhost:5086/api/EmployeRecord/GetByIdData?id='+id)
   
  }
  gender()
  {
    return this.http.get('http://localhost:5086/api/EmployeRecord/GetGenderRecord')
  }

  postdata(val:any)
  {
    console.warn(val);
    
    return this.http.post('http://localhost:5086/api/EmployeRecord/AddAllData',val)
  }

  delete1(id:any)
  {
    return this.http.delete('http://localhost:5086/api/EmployeRecord/deletedata?id='+id)
  }
  update(val:any)
  {
    console.log(val);
   return this.http.post('http://localhost:5086/api/EmployeRecord/UpdateRecord',val)
  }
  getcountry()
  {
    return this.http.get('http://localhost:5086/api/EmployeRecord/GetCountryRecord')
  }
  getstatebyid(id:any)
  {
    return this.http.get('http://localhost:5086/api/EmployeRecord/GetStateRecord?id='+id)
  }
  getcitybyid(id:any)
  {
    return this.http.get('http://localhost:5086/api/EmployeRecord/GetciyRecord?id='+id)
  }

}
