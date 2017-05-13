import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-question-create',
  templateUrl: 'question-create.html',
})
export class QuestionCreate {
  
  answerList = ['Odpověď 1', 'Odpověď 2', 'Odpověď 3', 'Odpověď 4'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  

}
