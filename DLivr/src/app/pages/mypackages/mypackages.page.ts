import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-mypackages',
  templateUrl: './mypackages.page.html',
  styleUrls: ['./mypackages.page.scss'],
})
export class MypackagesPage implements OnInit {


  
  submitted = false; 

  addPackageForm: FormGroup;
  packages = [];

  name: string = "";
  pickupAddress: string = "";
  deliveryAddress: string = "";
  receiverName: string = "";
  receiverPhoneNumber: string = "";
  senderPhoneNumber: string = "";
  packageLength: string = "";
  packageWeight: string ="";
  packageHeight: string = "";
  packageWidth: string = "";

  pickupHours = [];

  id : string = "";
  pickupDay : string = "";
  pickupStartHour: string = "";
  pickupEndHour: string = "";

  selectedPackage = [];

  selectedpickupHours = [
    {
      "id": 0,
      "pickupDay" : "",
      "pickupStartHour" : "",
      "pickupEndHour" : "",
    }
  ]


  get f() { return this.addPackageForm.controls; }

  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addPackageForm.invalid) {
      console.log('Add package form invalid');
        return;
    } 
  }
    
  toArray(object) : Array<any>
  {
    return Object.keys(object).map(function(key) {
      return [Number(key), object[key]];
    });
  }

  constructor(
      private menuCtrl: MenuController, 
      private userService: ClientsService,
      public formBuilder: FormBuilder,
    ) {
      console.log('email received in mypackages: ' + this.userService.email);
      userService.getPackages()
      .subscribe(data => {
        console.log(data);

        const packages = Object.values(data);
        console.log(packages);
        packages.forEach(p => {
          const names =  (p['receiverName'] + '');
          const colonIndex = names.lastIndexOf(':');

          // So we can see the actual name of the package 
          // because there is no packageName in the database 
          var receiverName = names;
          var packageName = '<name>';
          if (colonIndex != -1)
          {
            receiverName = names.substring(0, colonIndex - 1);
            packageName = names.substring(colonIndex + 1);
          }

          this.pushCard(
            packageName, // p['name'],
            p['senderAdress'],// p['pickupAddress'],
            p['receiverAdress'],// p['deliveryAddress'],
            receiverName,
            p['phoneNumberReceiver'],
            p['phoneNumberSender'],
            p['length'],
            p['kilograms'],
            p['height'],
            p['width'],
            [],
            p['status']
          )
        });

        if (packages.length > 0)
        {
          var divNoPackage = document.getElementById("noPackageText");
          divNoPackage.style.display = "none";
        }

      }, error => {
        console.log("Unable to retrieve packages from server");
        console.log(error);
      });

    this.addPackageForm = this.formBuilder.group(
      {
      packageName: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]
      )),
      pickupAddress: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]
      )),
      deliveryAddress: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]
      )),
      receiverName: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]
      )),
      receiverPhoneNumber: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(7),
          Validators.maxLength(30),
        ]
      )),
      senderPhoneNumber: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(7),
          Validators.maxLength(30),
        ]
      )),
      packageWeight: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
      packageWidth: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
      packageLength: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
      packageHeight: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
    });
  }

public removeValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).clearValidators();
       form.get(key).updateValueAndValidity();
  }
}

  ngOnInit() {
  }

  // close addPackage page/ editPackage page
  closeExistingPackage() {
    var divAdd = document.getElementById("addPackage");
    var buttonAdd = document.getElementById("addpackage");

    // var divEdit = document.getElementById("editPackage");

    divAdd.style.display = "none";
    // divEdit.style.display = "none";

    //buttonAdd.textContent = "Add Package";
  }

  clearAddPackageInputs()
  {
    this.name = "";
    this.pickupAddress = "";
    this.deliveryAddress = "";
    this.receiverName = "";
    this.receiverPhoneNumber = "";
    this.senderPhoneNumber = "";
    this.packageLength = "";
    this.packageWeight = "";
    this.packageHeight = "";
    this.packageWidth = "";
    this.pickupHours.splice(0, this.pickupHours.length);
    /* this.pickupHours.push(
      {
        "pickupDay" : "",
        "pickupStart" : "",
        "pickupEnd" : "",
      }
    ); */
  }

  setAddPackageInputs(pack)
  {
    this.name = pack.name;
    this.pickupAddress = pack.pickupAddress;
    this.deliveryAddress = pack.deliveryAddress;
    this.receiverName = pack.receiverName;
    this.receiverPhoneNumber = pack.receiverPhoneNumber;
    this.senderPhoneNumber = pack.senderPhoneNumber;
    this.packageLength = pack.packageLength;
    this.packageWeight = pack.packageWeight;
    this.packageHeight = pack.packageHeight;
    this.packageWidth = pack.packageWidth;
    this.pickupHours = pack.pickupHours.concat();
  }

  // addPackage form
  addPackageButton(){
    
    var divNoPackage = document.getElementById("noPackageText");
    var divDriverText = document.getElementById("textDriver")
    var divAdd = document.getElementById("addPackage");
    var buttonAdd = document.getElementById("addpackage");
    var divtextDriver2 = document.getElementById("textDriver2");
    
    console.log(buttonAdd.textContent);

   
    if (!this.addPackageForm.invalid)
      this.closeExistingPackage();

    divtextDriver2.style.display = "none";

    if (buttonAdd.textContent == "Add Package")
    {
      this.submitted = false;
      divNoPackage.style.display = "none";
      divAdd.style.display = "block";
      buttonAdd.textContent = "Confirm";
      divDriverText.style.display = "block";
    }
    else // Confirm
    {
      // if (this.addPackageForm.invalid)
      // {
      //   this.submitted = true;
      //   this.addPackageForm.updateValueAndValidity();
      //   return;
      // }


      if (!this.addPackageForm.invalid)
      {
        buttonAdd.textContent = "Add Package";
        divDriverText.style.display = "none";
        this.addPackageForm.clearValidators();
        this.addPackageForm.updateValueAndValidity();
      }

      this.pickupHours.forEach(pickupHour => {
        console.log(pickupHour);
      });

      var newPackage = this.makePackage(
        this.name, 
        this.pickupAddress,
        this.deliveryAddress,
        this.receiverName,
        this.receiverPhoneNumber,
        this.senderPhoneNumber,
        this.packageLength,
        this.packageWeight,
        this.packageHeight,
        this.packageWidth,
        this.pickupHours,
        "Delivery Order Sent"
      );

      console.log(newPackage);

      this.submitted = true;
      this.userService.addPackage(newPackage)
      .subscribe(data => {
        console.log("addPackage success: data");
        this.pushCard(
          this.name, 
          this.pickupAddress,
          this.deliveryAddress,
          this.receiverName,
          this.receiverPhoneNumber,
          this.senderPhoneNumber,
          this.packageLength,
          this.packageWeight,
          this.packageHeight,
          this.packageWidth,
          this.pickupHours,
          "Delivery Order Sent"
        );
      }, error => {
        console.log('Unable to register package');
        console.log(error);
        this.userService.presentWarning("Formular Invalid", "A aparut o problema cu informatiile pe care le-ati trimis");
        // There was a problem with the info you provided
      });
    }
  }

  // editPackage form
  editPackageForm(i){
    var divEdit = document.getElementById("editPackage");
    var buttonEdit = document.getElementById("addpackage");
    var divtextDriver2 = document.getElementById("textDriver2");

    this.closeExistingPackage();

    divEdit.style.display = "block";
    buttonEdit.textContent = "Save";
    divtextDriver2.style.display = "block";

    this.selectedPackage = this.packages[i - 1];
    console.log("editPackageForm: ");
    console.log("i = " + i);
    console.log("Name = " + this.selectedPackage["name"]);
    console.log("Number = " + this.selectedPackage["number"]);

    var pickupHours = this.selectedPackage["pickupHours"];

    pickupHours.forEach(element => {
      console.log(element);
    });

    this.clearAddPackageInputs();
    this.setAddPackageInputs(this.selectedPackage);
  }


  // delete a package in addPackage page
  deletePackage(i){

    this.packages.splice(i - 1, 1);
    console.log("delete package " + (i - 1).toString());
    
    for (var x = i - 1; x < this.packages.length ; x++)
    {
      this.packages[x].number--;
    }
  }
 
  cancelEdit(){

    var divEdit = document.getElementById("editPackage");
    var buttonEdit = document.getElementById("addpackage");
    var divtextDriver2 = document.getElementById("textDriver2");

    this.closeExistingPackage();
    this.addPackageForm.clearValidators();

    buttonEdit.textContent = "Add Package";
    divtextDriver2.style.display = "none";
    divEdit.style.display = "none";

  }

    // cancel edit in editPackage
   dontSaveEditPackage(){
    var buttonEdit = document.getElementById("editpackage");
    var divtextDriver2 = document.getElementById("textDriver2");

    this.closeExistingPackage();

    buttonEdit.textContent = "Add Package";
    divtextDriver2.style.display = "none";

    this.clearAddPackageInputs();
  }

  // cancel addPackage
  dontAddPackage(){
    var buttonAddPackage = document.getElementById("addpackage");
    var divDriverText = document.getElementById("textDriver");
    this.closeExistingPackage();

    buttonAddPackage.textContent = "Add Package";
    divDriverText.style.display = "none";

    this.clearAddPackageInputs();
  }

  // add pickup hour ng
  addPickupHour()
  { 
    this.addPickupItem();
  }

  makePackage(name, pickupAddress, deliveryAddress, receiverName, receiverPhoneNumber, senderPhoneNumber, packageLength,
    packageWeight, packageHeight, packageWidth, pickupHours, status){
    return {
      "number": (this.packages.length + 1).toString(),
      "name": name,
      "status": status,
      "pickupAddress": pickupAddress,
      "deliveryAddress": deliveryAddress,
      "receiverName": receiverName,
      "receiverPhoneNumber": receiverPhoneNumber,
      "senderPhoneNumber": senderPhoneNumber,
      "packageLength": packageLength,
      "packageWeight": packageWeight,
      "packageHeight": packageHeight,
      "packageWidth": packageWidth,
      "pickupHours": pickupHours.concat(), // create a copy of the array
      // We need to do this because putting just pickupHours here is just a reference (pointer) to the pickupHours
      // array. The next time the form is cleared, the pickupHours array will also be cleared, which would mean this reference would
      // be empty.
    };
  }

  pushCard(name, pickupAddress, deliveryAddress, receiverName, receiverPhoneNumber,senderPhoneNumber, packageLength,
     packageWeight, packageHeight, packageWidth, pickupHours, status){

    this.packages.push(this.makePackage(
      name, 
      pickupAddress, 
      deliveryAddress, 
      receiverName, 
      receiverPhoneNumber, 
      senderPhoneNumber,
      packageLength,
      packageWeight,
      packageHeight,
      packageWidth,
      pickupHours,
      status
    ));

    localStorage.setItem("mypackages.packages", JSON.stringify(this.packages));
    this.clearAddPackageInputs();
  }

  addPickupItem(){
    this.pickupHours.push(
      {
        // name (as string) : actual value
        // "id" : (this.selectedpickupHours.length + 1).toString(),
        "pickupDay" : "",
        "pickupStartHour" : "",
        "pickupEndHour" : "",
      }
    );
  }

/*
  deleteHoursForm(i)
  {
     var divtimeItem = document.getElementById("timeItem");

     divtimeItem.style.display = "none";
     i++;
  }
  */
}
