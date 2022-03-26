import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { TravellerModel } from './traveller-details.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.css']
})
export class TravellerDetailsComponent implements OnInit {

  formvalue!:FormGroup;
  travellerModelObj:TravellerModel = new TravellerModel();
  travellerData!: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder, private api:ApiService) { 
    
  }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      Name:[''],
      Age:[''],
      Mobile:[''],
      Boarding:[''],
      Destination:[''],
      Transport:['']
    })
    this.getTravellerDetails();
  }
  clickAddTraveller()
  {
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
postTravellerDetails(){
  this.travellerModelObj.Name=this.formvalue.value.Name;
  this.travellerModelObj.Age=this.formvalue.value.Age;
  this.travellerModelObj.Mobile=this.formvalue.value.Mobile;
  this.travellerModelObj.Boarding=this.formvalue.value.Boarding;
  this.travellerModelObj.Destination=this.formvalue.value.Destination;
  this.travellerModelObj.Transport=this.formvalue.value.Transport;
  
  this.api.postTraveller(this.travellerModelObj)
  .subscribe(res=>{
    console.log(res);
    alert('Traveller Added Successfully');
    this.getTravellerDetails();
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
  },
  err=>{
alert('Something Went Wrong');
  }
  )
}
getTravellerDetails()
{
this.api.getTraveller()
.subscribe(res=>{
  this.travellerData=res;
})
}
deleteTraveller(dat:any)
{
  this.api.deleteTraveller(dat.id)
  .subscribe(res=>{
    alert("Record Deleted Successfully");
    this.getTravellerDetails();
  })
}
onEdit(dat:any)
{
  this.showAdd=false;
  this.showUpdate=true;
  this.travellerData.id=dat.id;
  this.formvalue.controls['Name'].setValue(dat.Name);
  this.formvalue.controls['Age'].setValue(dat.Age);
  this.formvalue.controls['Mobile'].setValue(dat.Mobile);
  this.formvalue.controls['Boarding'].setValue(dat.Boarding);
  this.formvalue.controls['Destination'].setValue(dat.Destination);
  this.formvalue.controls['Transport'].setValue(dat.Transport);
}
updateTravellerDetails()
{
  this.travellerModelObj.Name=this.formvalue.value.Name;
  this.travellerModelObj.Age=this.formvalue.value.Age;
  this.travellerModelObj.Mobile=this.formvalue.value.Mobile;
  this.travellerModelObj.Boarding=this.formvalue.value.Boarding;
  this.travellerModelObj.Destination=this.formvalue.value.Destination;
  this.travellerModelObj.Transport=this.formvalue.value.Transport;

  this.api.updateTraveller(this.travellerModelObj,this.travellerModelObj.id)
  .subscribe(res=>{
    alert("Record Updated Successfully");
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
    this.getTravellerDetails();
  })
}
}
