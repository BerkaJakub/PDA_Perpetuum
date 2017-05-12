import { Component } from '@angular/core';
//import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import {QuestionCreate} from '../question-create/question-create';


const questionsData = [{
  title: 'Kdo1?',
 
  id: 0
},{
  title: 'Kdo2?',
  
  id: 1
},{
  title: 'Kdo3?',
  
  id: 2
},]

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questions: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.questions = angFire.database.object('/questions');
    this.questions = questionsData;
    
  }
  
  newQuestion(){
    this.navCtrl.push(QuestionCreate);
  }
  
}
