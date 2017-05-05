import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestionCreate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-create',
  templateUrl: 'question-create.html',
})
export class QuestionCreate {

  answerList = ['Odpověď 1', 'Odpověď 2', 'Odpověď 3', 'Odpověď 4'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionCreate');
  }


  customTrackBy(index: number, obj: any): any {
    return index;
  }

}
