import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  userType: String = 'client';
  clientPages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'My Packages',
      url: '/menu/mypackages',
      icon: 'cube'
    },
    {
      title: 'Settings',
      url: '/menu/settings',
      icon: 'settings'
    },
    {
      title: 'Payment',
      url: '/menu/payment',
      icon: 'card'
    },
    {
      title: 'Help',
      url: '/menu/help',
      icon: 'help-circle'
    },
  ];

  driverPages = [
    {
    title: 'Home',
    url: '/menu/homedriver',
    icon: 'home'
    },
    {
      title: 'My Packages',
      url: '/menu/mypackagesdriver',
      icon: 'cube'
    },
    {
      title: 'Settings',
      url: '/menu/settings',
      icon: 'settings'
    },
    {
      title: 'Payment',
      url: '/menu/payment',
      icon: 'card'
    },
    {
      title: 'Help',
      url: '/menu/help',
      icon: 'help-circle'
    },
  ];

  selectedPath = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
        this.selectedPath = event.url;
    });
   }

  ngOnInit() {
  }

  changeUserType() {
    if (this.userType === 'client') {
      this.userType = 'driver';
      this.router.navigate(['menu/homedriver']);
    } else {
      this.userType = 'client';
      this.router.navigate(['menu/home']);
    }
  }

}
