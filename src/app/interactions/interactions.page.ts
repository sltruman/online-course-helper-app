import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { HttpClient } from "@angular/common/http"
import { API } from '../api-def'
import { TitlePage } from '../title/title.page';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.page.html',
  styleUrls: ['./interactions.page.scss'],
})
export class InteractionsPage implements OnInit {
  items = [

  ]

  constructor(public http: HttpClient,public modal: ModalController, public storage: Storage) { }

  ngOnInit() {
    this.storage.get('interactions').then(items => this.items = items == null ? [] : items)
  }

  ionViewDidLeave() {}

  async addClick() {
    let m = await this.modal.create({component:TitlePage})
    await m.present()
    let ret = await m.onDidDismiss()
    let name = ret.data
    if (name != null) this.items.push(name)
    this.storage.set('interactions', this.items)
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1)
    this.storage.set('interactions', this.items)
  }
}
