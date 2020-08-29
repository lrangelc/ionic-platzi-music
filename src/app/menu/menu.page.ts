import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  constructor(private menu: MenuController, private navCtrl: NavController, private storage: Storage) {}

  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.storage.set('isUserLoggedIn', false);
    this.navCtrl.navigateRoot('/login');
  }

  goToSettings() {
    this.navCtrl.navigateRoot('/menu/settings');
    this.menu.close();
  }

  goToHome() {
    this.navCtrl.navigateRoot('/menu/home');
    this.menu.close();
  }
}
