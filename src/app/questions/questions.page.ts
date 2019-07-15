import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { HttpClient } from "@angular/common/http"
import { API } from '../api-def'
import { TitlePage } from '../title/title.page';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  items = [

  ]

  constructor(public http: HttpClient, public modal: ModalController, public storage: Storage) {
    storage.get('questions').then(items => this.items = items == null ? [] : items)
  }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.storage.get('questions').then(items => {
      if (this.items.toString() == items.toString()) return
      this.storage.set('questions', this.items)
    })
  }

  itemSelected(item: string) {
    console.log("Selected Item", item)
    this.http.get(API.Say, { params: { msg: item } })
      .subscribe(res => {
        console.log(res)
      }, err => {
        console.error(err)
      })
  }

  async addClick() {
    let m = await this.modal.create({component:TitlePage})
    await m.present()
    let ret = await m.onDidDismiss()
    let name = ret.data
    if (name != null) this.items.push(name)
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1)
  }
}
