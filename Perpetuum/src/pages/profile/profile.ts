import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  user: FirebaseObjectObservable<any>;
  name: string;
  money: number;
  numAnswers: number;
  numQuestions: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {
    this.user = angFire.database.object('/users/' + 0); // chci jenom toho naseho umeleho uzivatele
    this.numAnswers = 0;
    this.numQuestions = 0;
    this.user.subscribe(u =>{
      this.name = u.name;
      this.money = u.money;
      u.questionsAnswered.forEach(question => {
        if(question == true){
          this.numAnswers++;
        }
      });
      u.myQuestions.forEach(question => {
          this.numQuestions++;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
