import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetdataComponent } from './getdata/getdata.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    component:GetdataComponent,
    path:'getdata'
  },
  {
    component:AddComponent,
    path:'add'
  },
  {
    component:NavbarComponent,
    path:'navbar'
  },
  {
    component:UpdateComponent,
    path:'update'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
