import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuestionCreate} from '../question-create/question-create';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questions: FirebaseObjectObservable<any>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.questions = angFire.database.object('/questions');
    
    
  }
  
  newQuestion(){
    this.navCtrl.push(QuestionCreate);
  }
  
}
