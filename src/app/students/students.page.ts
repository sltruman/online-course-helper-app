import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TitlePage } from '../title/title.page'
import { API } from '../api-def'
import { stringify } from 'querystring';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  students = []
  items = []
  course: string
  buttonEnteredDisabled: boolean = false
  buttonLeaveDisabled: boolean = true
  numberOfEnteredRobots = 0

  constructor(
    public storage: Storage,
    public router: Router,
    public http: HttpClient,
    public modalController: ModalController,
    public activeRoute: ActivatedRoute) {
    activeRoute.queryParams.subscribe(params => {
      this.course = params.course
    })
   
  }

  async ngOnInit() {
    this.students = await this.storage.get('students'); this.students = this.students ? this.students : []
    for (let s of this.students) this.items.push({ status: '学生离线', text: s })
    this.numberOfEnteredRobots = this.students.length
  }

  updateStatus = () => {
    this.items.splice(this.students.length - 1, this.items.length - this.students.length)

    for (let i = 0; i < this.students.length; i++) {
      this.http.get(API.getStudentStatus, { params: { account: this.students[i].split(':')[0] } }).subscribe(res => {
        let item = { status: res['err'] ? '接口错误' : res['ret'] ? res['ret'] : '学生离线' , text: this.students[i] }
        if (i < this.items.length) this.items[i] = item
        else this.items.push(item)
      }, err => {
        let item = { status: '网络错误', text: this.students[i] }
        if (i < this.items.length) this.items[i] = item
        else this.items.push(item)
      })
    }

    if (this.timer) setTimeout(this.updateStatus, 10000)
  }

  timer = null
  async enterClick() {
    clearTimeout(this.timer)
    let accounts = []
    for (let s of this.students) accounts.push(s.split(':'))
    this.http.post(API.putCourseTask, {
      course: this.course,
      accounts: accounts,
      interactions: await this.storage.get('interactions'),
      questions: await this.storage.get('questions')
    }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).subscribe(res => {
      if(!res['ret']) return;
      alert('命令已发送！')
      this.timer = setTimeout(this.updateStatus)
    }, err => {
      console.error(err)
    })
  }

  leaveClick() {
    clearTimeout(this.timer)
    this.timer = null
  }

  async addClick() {
    let m = await this.modalController.create({ component: TitlePage })
    await m.present()
    let ret = await m.onDidDismiss()
    let value = ret.data
    if (value != null) {
      this.items.push({ status: '学生离线', text: value })
      this.students.push(value)
      await this.storage.set('students', this.students)
      this.numberOfEnteredRobots = this.students.length
    }
  }

  async removeClick(item) {
    let i = this.students.indexOf(item)
    this.students.splice(i, 1)
    await this.storage.set('students', this.students)
    this.items.splice(i, 1)
    this.numberOfEnteredRobots = this.students.length
  }

  interactionsClick() {
    this.router.navigate(['/interactions'])
  }

  questionsClick() {
    this.router.navigate(['/questions'])
  }
}
