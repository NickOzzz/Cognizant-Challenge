import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public output:any = [];
  //cars is rendered into html
  public cars:any = [];
  //total is rendered into html
  public total:number = 0;
  //no is renedered into html
  public no:string = "";
  constructor(private cookieService:CookieService, public router: Router) { }

  //execute this function on initialization
  ngOnInit(): void {
    //getting cookie with all the cars as string
    this.cars = this.cookieService.get("cart");
    //checking whether cokie is empty
    if (this.cars === ""){
      //if empty, render empty string
      this.cars = [];
    }
    //if not empty, parse list string into list with 
    //dictionaries consisting of cars and their details
    else {
      this.cars = JSON.parse(this.cars);
    }
    //for each car in the list, add price to the total variable
    this.cars.forEach(val => {
      this.total += Number(val["price"])
    })
    //if the length of cars list is 0, render the following string
    if (this.cars.length < 1){
      this.no = "no items were added to shopping car";
    }
    else{
      this.no = "";
    }
  }
  //remove cookie function
  removeCookie(key){
    //using argument key, filtering all the cars and returing only
    //cars that are not equal to the car that we passed into this function
    this.cars = this.cars.filter(val => {
      if (val["id"] !== key){
        return val;
      }
    })
    this.total = 0;
    //getting cookie counter and substructing one from it
    var count:any = this.cookieService.get("counter");
    count = Number(count);
    count--;
    //calculating total amount
    this.cars.forEach(val => {
      this.total += Number(val["price"])
    })
    //deleting outadated cookies and setting the new ones with changes
    this.cookieService.delete("counter");
    this.cookieService.set("counter", count.toString());
    this.cookieService.delete("cart");
    this.cookieService.set("cart", JSON.stringify(this.cars));
    //throw an error if cars list is empty 
    if (this.cars.length < 1){
      this.no = "no items were added to shopping car";
    }
    else{
      this.no = "";
    }
  }
  

}
