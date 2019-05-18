import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-mypackages',
  templateUrl: './mypackages.page.html',
  styleUrls: ['./mypackages.page.scss'],
})
export class MypackagesPage implements OnInit {
  
  submitted = false; 

  addPackageForm: FormGroup;
  packages = [];

  namePackage: string = "";
  senderAdress: string = "";
  receiverAdress: string = "";
  receiverName: string = "";
  senderName: string = "";
  phoneNumberReceiver: string = "";
  phoneNumberSender: string = "";
  length: string = "";
  kilograms: string ="";
  height: string = "";
  width: string = "";

  selectedPackage = [];

  id : string = "";

  rating;

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

  // validateAddress(userService: ClientsService)
  // {
  //   console.log("Validate address test");

  //   return (control: AbstractControl): Observable<ValidationErrors> => {
  //     return userService.validateAddress();
  //   };
  // }

  getAllPackages()
  {
    this.packages = [];
    this.userService.getPackages()
    .subscribe(data => {
      console.log(data);

      const packages = Object.values(data);
      console.log(packages);
      packages.forEach(p => {
        this.pushCard(
          p['id'],
          p['namePackage'],
          p['senderAdress'],
          p['receiverAdress'],
          p['receiverName'],
          p['senderName'],
          p['phoneNumberReceiver'],
          p['phoneNumberSender'],
          p['length'],
          p['kilograms'],
          p['height'],
          p['width'],
          //'Delivered'
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
  }

  onRatingIconClick(i: number)
  {
    const show = this.packages[i - 1]['ratingShow'];

    if (show)
    {
      console.log("Sending rating: " + this.packages[i - 1]['id'] +", " + this.packages[i - 1]['rating']);
      this.userService.sendPackageRating(this.packages[i - 1]['id'], this.packages[i - 1]['rating'])
      .subscribe(data => {
        console.log("rating: sent!");
      }, error => {
        console.log("Can't send the rating!");
        console.log(error);
      });
    }

    this.packages[i - 1]['ratingShow'] = !show;
  }

  getRatingIcon(state: boolean)
  {
    if (state)
      return 'checkmark';

    return 'star';
  }

  onRateChange(packageNumber, rating)
  {
    console.log(packageNumber);
    console.log('Rating: ' + rating);
    this.packages[packageNumber - 1]['rating'] = rating;
  }

constructor(
    private menuCtrl: MenuController, 
    private userService: ClientsService,
    public formBuilder: FormBuilder,
  ) 
  {
    console.log('email received in mypackages: ' + this.userService.email);

    this.getAllPackages();

    this.addPackageForm = this.formBuilder.group(
      {
        namePackage: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]
      )),
      senderAdress: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]
      )),
      receiverAdress: new FormControl('', Validators.compose(
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
      senderName: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]
      )),
      phoneNumberSender: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(7),
          Validators.maxLength(30),
        ]
      )),
      phoneNumberReceiver: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(7),
          Validators.maxLength(30),
        ]
      )),
      kilograms: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
      width: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
      length: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
      height: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(1),
          Validators.maxLength(30),
        ]
      )),
    });
  }

  ngOnInit() {
  }

  // close addPackage page/ editPackage page
  closeExistingPackage() {
    // editPackage
    var divAdd = document.getElementById("addPackage");
    var divEdit = document.getElementById("editPackage");

    divAdd.style.display = "none";
    divEdit.style.display = "none";
    // divEdit.style.display = "none";

    //buttonAdd.textContent = "Add Package";
  }

  clearAddPackageInputs()
  {
    this.namePackage = "";
    this.receiverAdress = "";
    this.receiverName = "";
    this.phoneNumberReceiver = "";

    this.senderName = "";
    this.senderAdress = "";
    this.phoneNumberSender = "";

    this.length = "";
    this.kilograms = "";
    this.height = "";
    this.width = "";
  }

  setAddPackageInputs(pack)
  {
    this.namePackage = pack.name;

    this.senderName = pack.senderName;
    this.senderAdress = pack.senderAdress;
    this.phoneNumberSender = pack.phoneNumberSender;

    this.receiverAdress = pack.receiverAdress;
    this.receiverName = pack.receiverName;
    this.phoneNumberReceiver = pack.phoneNumberReceiver;

    this.length = pack.length;
    this.kilograms = pack.kilograms;
    this.height = pack.height;
    this.width = pack.width;
  }

  onEditPackageSave()
  {
    var divNoPackage = document.getElementById("noPackageText");
    var divDriverText = document.getElementById("textDriver")
    var divAdd = document.getElementById("addPackage");
    var buttonAdd = document.getElementById("addpackage");
    var divtextDriver2 = document.getElementById("textDriver2");
    
    console.log(buttonAdd.textContent);
   
    if (!this.addPackageForm.invalid)
      this.closeExistingPackage();

    divtextDriver2.style.display = "none";

    if (!this.addPackageForm.invalid)
    {
      buttonAdd.textContent = "Add Package";
      divDriverText.style.display = "none";
      this.addPackageForm.clearValidators();
      this.addPackageForm.updateValueAndValidity();
    }

    var newPackage = this.makePackage(
      this.selectedPackage['id'],
      this.namePackage, 
      this.senderAdress,
      this.receiverAdress,
      this.receiverName,
      this.senderName,
      this.phoneNumberReceiver,
      this.phoneNumberSender,
      this.length,
      this.kilograms,
      this.height,
      this.width,
      "Ready"
    );

    console.log(newPackage);

    this.submitted = true;
    this.userService.editPackage(newPackage)
    .subscribe(data => {
      console.log("editPackage success: data");
      this.getAllPackages();
    }, error => {
      console.log('Unable to register package');
      console.log(error);
      this.userService.presentWarning("Formular Invalid", "A aparut o problema cu informatiile pe care le-ati trimis");
    });
  }

  // addPackage form
  addPackageButton()
  {
    // editPackage
    var divEditPackage = document.getElementById("editPackage");

    if (divEditPackage.style.display != "none")
    {
      this.onEditPackageSave();
      return;
    }

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
      if (!this.addPackageForm.invalid)
      {
        buttonAdd.textContent = "Add Package";
        divDriverText.style.display = "none";
        this.addPackageForm.clearValidators();
        this.addPackageForm.updateValueAndValidity();
      }

      var newPackage = this.makePackage(
        -1,
        this.namePackage, 
        this.senderAdress,
        this.receiverAdress,
        this.receiverName,
        this.senderName,
        this.phoneNumberReceiver,
        this.phoneNumberSender,
        this.length,
        this.kilograms,
        this.height,
        this.width,
        "Ready"
      );

      console.log(newPackage);

      this.submitted = true;
      this.userService.addPackage(newPackage)
      .subscribe(data => {
        console.log("addPackage success: data");
        this.getAllPackages();
      }, error => {
        console.log('Unable to register package');
        console.log(error);
        this.userService.presentWarning("Formular Invalid", "A aparut o problema cu informatiile pe care le-ati trimis");
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

    this.clearAddPackageInputs();
    this.setAddPackageInputs(this.selectedPackage);
  }


  // delete a package in addPackage page
  deletePackage(i)
  {
    this.userService.deletePackage(this.packages[i - 1]['id'])
    .subscribe(data => {
      this.getAllPackages();
    }, error => {
      console.log('You can not delete this package');
    })
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
    var buttonEdit = document.getElementById("addpackage");
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


  makePackage(id, namePackage, senderAdress, receiverAdress, receiverName, senderName, phoneNumberReceiver, 
    phoneNumberSender, length, kilograms, height, width, status){
    return {
      "id": id,
      "number": (this.packages.length + 1).toString(),
      "namePackage": namePackage,
      "status": status,
      "senderAdress": senderAdress,
      "receiverAdress": receiverAdress,
      "receiverName": receiverName,
      "senderName": senderName,
      "phoneNumberReceiver": phoneNumberReceiver,
      "phoneNumberSender": phoneNumberSender,
      "length": length,
      "kilograms": kilograms,
      "height": height,
      "width": width,
      "ratingShow": false,
      "rating": -1,
    };
  }

  pushCard(id, namePackage, senderAdress, receiverAdress, receiverName, senderName, phoneNumberReceiver,
    phoneNumberSender, length, kilograms, height, width, status)
  {

    this.packages.push(this.makePackage(
      id,
      namePackage, 
      senderAdress, 
      receiverAdress, 
      receiverName, 
      senderName,
      phoneNumberReceiver, 
      phoneNumberSender,
      length,
      kilograms,
      height,
      width,
      status
    ));

    this.clearAddPackageInputs();
  }

}
