import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { ItemDetailsPage } from '../pages/item-details/item-details';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { Favouritelist } from '../pages/favouritelist/favouritelist';
import { ListPage } from '../pages/list/list';
import { Category } from '../pages/category/category';
import { QuestionCreate } from '../pages/question-create/question-create';
import { Profile } from '../pages/profile/profile';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {

    apiKey: "AIzaSyBO0pCiQYYVIKx7EktW5uf-R8ipzKhU2Qo",
    authDomain: "perpetuum-419f2.firebaseapp.com",
    databaseURL: "https://perpetuum-419f2.firebaseio.com",
    projectId: "perpetuum-419f2",
    storageBucket: "perpetuum-419f2.appspot.com",
    messagingSenderId: "212225115469"
  

};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    QuestionCreate,
    Favouritelist,
    Profile,
    Category

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    QuestionCreate, 
    Favouritelist,
    Profile,
    Category
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
