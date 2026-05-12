import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);

  baseUrl = 'https://api.freeprojectapi.com/api/BusBooking';

  registerUser(data: any) {
    return this.http.post("https://api.freeprojectapi.com/api/BusBooking/AddNewUser", data);
  }

  loginUser(data: any) {
    return this.http.post("https://api.freeprojectapi.com/api/BusBooking/login", data);
  }

  getAllUsers() {
    return this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetAllUsers");
  }

  deleteUser(id: number) {
    return this.http.delete(`https://api.freeprojectapi.com/api/BusBooking/DeleteUserByUserId/${id}`);
  }   

  // onSaveEnquiry(Obj: any){
  //   return this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-enquiry", Obj)
  // }
}
