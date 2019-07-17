import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { HttpClient } from "@angular/common/http"
import { TitlePage } from '../title/title.page'
import { API } from '../api-def'


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  items = [

  ]

  constructor(public http: HttpClient, public modal: ModalController, public storage: Storage) {}

  async ngOnInit() {
    this.items = await this.storage.get('questions')
  }

  ionViewDidLeave() {}

  async addClick() {
    let m = await this.modal.create({component:TitlePage})
    await m.present()
    let ret = await m.onDidDismiss()
    let name = ret.data
    if (name != null) this.items.push(name)
    this.storage.set('questions', this.items)
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1)
    this.storage.set('questions', this.items)
  }
}
