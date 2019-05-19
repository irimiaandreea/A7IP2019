import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { debug } from 'util';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  name: String = '';
  clientPages = [
    {
      title: 'Home',
      url: '../menu/home',
      icon: 'home'
    },
    {
      title: 'My Packages',
      url: '../menu/mypackages',
      icon: 'cube'
    },
    {
      title: 'Settings',
      url: '../menu/settings',
      icon: 'settings'
    },
    {
      title: 'Payment',
      url: '../menu/payment',
      icon: 'card'
    },
    {
      title: 'Help',
      url: '../menu/help',
      icon: 'help-circle'
    },
  ];

  driverPages = [
    {
    title: 'Home',
    url: '../menu/homedriver',
    icon: 'home'
    },
    {
      title: 'My Packages',
      url: '../menu/mypackagesdriver',
      icon: 'cube'
    },
    {
      title: 'Settings',
      url: '../menu/settings',
      icon: 'settings'
    },
    {
      title: 'Payment',
      url: '../menu/payment',
      icon: 'card'
    },
    {
      title: 'Help',
      url: '../menu/help',
      icon: 'help-circle'
    },
  ];

  selectedPath = '';
  constructor(private router: Router, private userService: ClientsService,) {
    this.router.events.subscribe((event: RouterEvent) => {
        this.selectedPath = event.url;
    });

    console.log()
    this.userService.getProfileInfoSender()
    .subscribe(data => {
      console.log("Can get the name.");
      this.name = data['name'];
      console.log(JSON.stringify(data));

    }, error => {
      console.log("Can't get the name.");
      console.log(error);
    });
   }

  ngOnInit() {
  }

  changeUserType() {
    if (this.userService.userType === 'client') {
      this.userService.changeToDriver();
      this.router.navigate(['app/menu/homedriver']);
    } else {
      this.userService.changeToClient();
      this.router.navigate(['app/menu/home']);
    }
  }

}
