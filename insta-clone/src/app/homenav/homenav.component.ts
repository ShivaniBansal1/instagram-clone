import { SendHttpRequestService } from './../send-http-request.service';
import { ProfileDashboardComponent } from './../profile-dashboard/profile-dashboard.component';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';


@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.css']
})
export class HomenavComponent implements OnInit {
  users$: Observable<any[]>;
  private searchTerms = new Subject<string>();


  constructor(private sendHttpRequestService: SendHttpRequestService, private _router:Router) { }

  // Push a search term into the observable stream. 
  search(term: string): void {
    this.searchTerms.next(term);
   }
  res:any;

  ngOnInit(){
    // document.addEventListener('click',this.func);
    this.users$ = this.searchTerms.pipe(
      
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.sendHttpRequestService.searchUsers(term)
    ));
    console.log(this.users$, "usersssssssssss")
    
  }

  myProfile(){
    console.log("inside my profile func---->>>>")  
    let loggedinUserId = this.sendHttpRequestService.jsonDecoder(localStorage.getItem("token")).data._id
    this._router.navigate(["/profile", loggedinUserId]);
    //this.profileDashboard.loadUserData(loggedinUserId,null);
  }

  searchUser(loggedinUserId:string){
    //this.profileDashboard.loadUserData(loggedinUserId, null)

  }
  
  // close(){
  //   this.isVisible=false;
  // }
isVisible:boolean = true;
func(event){  
 
  var box = document.querySelector(".boxes");

  console.log(box,event.target,  "my boxxxx")
  // this.isVisible = box.contains(event.target)

  if (box.contains(event.target)){
    this.isVisible = true
  }
  else{
    this.isVisible = false
  }
  console.log(this.isVisible, "valueee")
  console.log(box.contains(event.target),"hhhhhh");

}

}
