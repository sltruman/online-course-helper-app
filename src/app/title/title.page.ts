import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, NavParams, IonButton, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-title',
  templateUrl: './title.page.html',
  styleUrls: ['./title.page.scss'],
})

export class TitlePage implements OnInit {
  @ViewChild('inputName') inputName: IonInput
  @ViewChild('buttonOk') buttonOk: IonButton
  buttonOkDisabled: boolean
  
  constructor(private modelCtrl: ModalController, private navParams: NavParams) { 
    console.log(navParams.get('firstName'))
  }

  ngOnInit() {}

  ionViewDidLoad() {}

  inputNameOnChange() {
    if (0 < this.inputName.value.length) {
      this.buttonOkDisabled = false
    }
    else {
      this.buttonOkDisabled = true
    }
  }

  dismiss() {
    this.modelCtrl.dismiss()
  }

  ok() {
    this.modelCtrl.dismiss(this.inputName.value)
  }
}
