import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private userService: ClientsService) {
  }

  ngOnInit() {
  }

  changeUserType() {
    if (this.userService.userType === 'client') {
      this.userService.changeToDriver();

    } else {
      this.userService.changeToClient();

    }
  }

}
