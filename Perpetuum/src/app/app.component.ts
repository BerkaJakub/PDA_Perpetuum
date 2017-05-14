import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { Favouritelist } from '../pages/favouritelist/favouritelist';
import { ListPage } from '../pages/list/list';
import { Category } from '../pages/category/category';
import { QuestionCreate } from '../pages/question-create/question-create';
import { Profile } from '../pages/profile/profile';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  userName: string;
  userEmail: string;
  userRef: FirebaseObjectObservable<any>;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    angFire: AngularFire
  ) {
    this.initializeApp();
    this.userRef = angFire.database.object('/users/' + 0);
    // set our app's pages
    this.pages = [
      { title: 'Profil', component: Profile },
      { title: 'Otázky', component: HelloIonicPage },
      { title: 'Výber kategorií', component: Category },
      { title: 'Oblíbené otázky', component: Favouritelist },
      { title: 'Moje otázky', component: ListPage },
     
    ];

    this.userRef.subscribe(user =>{
      this.userName = user.name;
      this.userEmail = user.email; 
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
