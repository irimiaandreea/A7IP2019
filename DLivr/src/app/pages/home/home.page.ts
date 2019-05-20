import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  notifications = [];

  constructor(private menuCtrl: MenuController, private userService : ClientsService) { }

  ngOnInit() {
    // GET localhost:8298/package-management/packages/getPackagesSender 
    // returneaza un json care repezinta un obiect cu urmatoarele campuri: 
    // id,namePackage,senderAddress,receiverAddress,kilograms,phoneNumberSender,
    // phoneNumberReceiver,senderName,receiverName,length,width,height. Length,width,
    // height sunt de tip int
    this.userService.getPackages()
    .subscribe(data => {
      console.log("Getting data about packages");
      this.notifications = data as [];

    }, error => {
      console.log("Can't get data about packages");
      console.log(error);
      this.userService.presentWarning("Atentie", "Nu aveti nicio notificare");
    });
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

}
