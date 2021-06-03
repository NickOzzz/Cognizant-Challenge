import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  //style of the div with data
  public pop:any = "";
  public left:any = "27%";
  private data:any = [];
  public temp2:any = [];
  //temp3 is rendered into html
  public temp3:any = [];
  //counter is rendered into html
  public counter:any = "";
  public added:string = "";
  //error is rendered into html
  public error:string = "";
  public ware:any = "";
  public loc:any = "";
  public pop_list:any = {};
  constructor(private http: HttpClient, private cookieService: CookieService, public router: Router) { }

  //executing this function on initialization of page
  ngOnInit(): void {
    var temp:any = [];
    this.temp2 = [];
    var sub1:any = "";
    var sub2:any = "";
    //retrieving data from our API using get request
    const url ='https://localhost:5001/api/values';
    this.http.get(url).subscribe((res)=>{
      this.data = res
      //getting keys of the retrieved dictionary and appending each one of them to the array
      Object.keys(this.data).forEach(val => {
        temp = JSON.parse(this.data[val]["cars"]);
        sub1 = this.data[val]["name"];
        temp["vehicles"].forEach(vv => {
          vv["warehouse"] = sub1;
          vv["location"] = temp["location"];
          this.temp2.push(vv);
          //sorting each dictionary in the array by date
          this.temp3 = this.temp2.sort((x:any, y:any) => {
            return <any>new Date(y["date_added"]) - <any>new Date(x["date_added"]);
          })
        })
      });
    })
    //getting our counter cookie which holds string that 
    //represent the amount of cars added to the shopping cart
    this.counter = this.cookieService.get("counter");
  }
  //function to add car to the shopping cart
  setCar(make, model, year, price, date, id){
    this.error = "";
    var passer:string = "";
    var seto:any = {};
    var bol:boolean = true;
    //retreiveing counter cookie
    var count = this.cookieService.get("counter");
    //retrieving cart cookie
    passer = this.cookieService.get("cart");
    if (passer === "") {
      //if cart cookie is empty, set new cookie consisting of dictionary 
      //with car details that we have passed as arguments into this function
      this.cookieService.set("cart", JSON.stringify([{"make": make, "model":model, "year":year, "price":price, "date":date, "id":id}]))
    }
    else {
      //if cookie already exists, check whether we are saving the same cookie or not
      seto = JSON.parse(passer);
      seto.forEach(val => {
        if (val["id"] === id){
          bol = false;
        }
      })
      //if cookie is not repeating, set counter cookie 
      //or add 1 to counter cookie and push dictionary with car details into array to save it as cookie
      if (bol){
        if (count === ""){
          this.cookieService.set("counter", "1");
        }
        else{
          var num:any = this.cookieService.get("counter");
          this.cookieService.delete("counter")
          num = Number(num);
          num++;
          this.cookieService.set("counter", num.toString())
        }
        this.counter++;
        seto.push({"make": make, "model":model, "year":year, "price":price, "date":date, "id":id})
        this.cookieService.delete("cart");
        this.cookieService.set("cart", JSON.stringify(seto))
      }
      //throw an error if the car has already been added
      else{
        this.error = "this item has already been added"
      }
    }

  }
  //changing style
  changeStyle(make, model, year, price, date, warehouse, location, licensed){
    //changing style of the hidden div and div with data
    this.left = "15%";
    this.pop = "flex";
    //assigning all the argument to element in dictionary to render it in the pop out div
    this.pop_list["make"] = make;
    this.pop_list["model"] = model;
    this.pop_list["year"] = year;
    this.pop_list["price"] = price;
    this.pop_list["date"] = date;
    this.pop_list["warehouse"] = warehouse;
    this.pop_list["location"] = location;
    this.pop_list["licensed"] = licensed;
  }

}
