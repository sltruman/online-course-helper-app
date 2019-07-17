import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TitlePage } from '../title/title.page'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  items = []

  constructor(private storage: Storage, public router: Router,public modalController: ModalController) {
    storage.get('courses').then(items => this.items = items == null ? [] : items)
  }

  ngOnInit() {}

  itemSelected(item: string) {
    console.log("Selected Item", item)
    this.router.navigate(['students'],{queryParams:{course:item}})
  }

  async addClick() {
    let m = await this.modalController.create({component:TitlePage})
    await m.present()
    let res = await m.onDidDismiss()
    if (res.data != null) {
      console.log(res.data)
      this.items.push(res.data)
      await this.storage.set('courses', this.items)
    }
  }

  async remove(item) {
    this.items.splice(this.items.indexOf(item), 1)
    await this.storage.set('courses', this.items)
  }
}
