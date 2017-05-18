import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { Badges } from '../badges/badges';
import {QuestionCreate} from '../question-create/question-create';

/**
 * Generated class for the Tabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class Tabs {

  tab1Root: any = Profile;
  tab2Root: any = Badges;

  constructor(public navCtrl: NavController) {}

  newQuestion(){
    this.navCtrl.push(QuestionCreate);
    
  }

}



