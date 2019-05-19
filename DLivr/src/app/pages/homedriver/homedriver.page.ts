import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ClientsService } from 'src/app/services/clients.service';
declare var google: any;

@Component({
  selector: 'app-homedriver',
  templateUrl: './homedriver.page.html',
  styleUrls: ['./homedriver.page.scss'],
})
export class HomedriverPage implements OnInit {

  packageArray: PackageCollection = new PackageCollection();
  selectedPackage: PackageFormal;
  packageArr: PackageFormal[] = [];

  packages: any;
  @ViewChild('Map') mapElement: ElementRef;
  map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = 'AIzaSyCzbVg-JhZ5enrOtt6KwzDFqG9_7C-vSYo'; /*Your API Key*/

constructor(public zone: NgZone, public geolocation: Geolocation, public userService: ClientsService) {
  /*load google map script dynamically */
    const script = document.createElement('script');
    script.id = 'googleMap';
    if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
    } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=';
    }
    document.head.appendChild(script);

    /*Get Current location*/
    this.geolocation.getCurrentPosition().then((position) =>  {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
    });

    /*Map options*/
    this.mapOptions = {
        center: this.location,
        zoom: 15,
        mapTypeControl: false
    };
    setTimeout(() => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

        /*Marker Options*/
         this.markerOptions.position = this.location;
         this.markerOptions.map = this.map;
         this.markerOptions.title = 'My Location';
         this.markerOptions.label = '1';
         this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);

    userService.getPackagesInAreaOf('iasi').subscribe (data => {

      this.packages = Object.values(data);

      const loc = {lat: 49.143022, lng: 29.581259};
        this.addMarker(loc, this.map, this.packages[0]);
      this.packages.forEach(p => {

        const pack = new PackageFormal(
            p['height'],
            p['id'],
            p['kilograms'],
            p['length'],
            p['phoneNumberReceiver'],
            p['phoneNumberSender'],
            p['receiverAdress'],
            p['receiverName'],
            p['senderAdress'],
            p['width']);

        this.packageArray.packages.push(pack);
       // this.packageArr.push(pack);
        const loca = {lat: 47.143022, lng: 27.581259};
        this.addMarker(loca, this.map, pack);
      });
    });
  }



addMarker(location, map, packageForMe: PackageFormal) {
  console.log(packageForMe);
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    label: packageForMe.id.toString()
  });

  console.log('packageForMe' + packageForMe);

  marker.addListener('click', function() {
    console.log('should print dis');
    /*for (let i = 0; i < 3 ; i++) {
      if (this.packageArray[i].id === marker.label) {
       this.selectedPackage = this.packageArray[i];
      }
    }
    console.log('Selected Package: ' + this.selectedPackage);*/
    map.setCenter(marker.getPosition());
  });
}

  ngOnInit() {
  }

}

class PackageFormal {
  constructor(
    public height: number,
    public id: number,
    public kilograms: number,
    public length: number,
    public phoneNumberReceiver: string,
    public phoneNumberSender: string,
    public receiverAdress: string,
    public receiverName: string,
    public senderAdress:  string,
    public width: number ) {}
}

class PackageCollection {
  packages: PackageFormal[] = [];
  public getLength() {
    return this.packages.length;
  }
}
