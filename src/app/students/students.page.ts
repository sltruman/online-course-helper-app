import { Component, OnInit } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { HttpClient } from "@angular/common/http"
import { API } from '../api-def'

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  course: string
  numberOfUnsignedRobots: number = 0
  numberOfSignedRobots: number = 0
  numberOfEnteredRobots: number = 0
  timer = true
  buttonSignDisabled: boolean = false
  buttonEnteredDisabled: boolean = false
  buttonLeaveDisabled: boolean = true

  constructor(
    public router: Router,
    public http: HttpClient) {
    
    console.log(this.course)
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('enter page')

    var setNumberOfRobots = () => {
      this.http.get(API.NumberOfRobotsOfStatus)
        .subscribe(res => {
          console.log(res)
          this.numberOfUnsignedRobots = res['ret']['unsigned']
          this.numberOfSignedRobots = res['ret']['signed']
          this.numberOfEnteredRobots = res['ret']['entered']
        }, err => {
          console.error(err)
        })

      if (this.timer) setTimeout(setNumberOfRobots, 5000)
    }

    setTimeout(setNumberOfRobots, 5000)
    this.timer = true
  }

  ionViewWillLeave() {
    console.log('leave page')
    this.timer = false
  }


  studentsSign() {
    this.http.get(API.Sign, {
      params: { course: this.course }
    }).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

    this.buttonSignDisabled = true
  }

  studentsEnter() {
    this.http.get(API.Enter, {//Get number of robots of available
      params: { course: this.course }
    }).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

    this.buttonEnteredDisabled = true
    this.buttonLeaveDisabled = false
  }

  interactionsClick() {
    this.router.navigate(['/InteractionsPage'])
  }

  questionsClick() {
    this.router.navigate(['/QuestionsPage'])
  }

  leaveClick() {
    if (!confirm('让学生离开课堂吗?'))
      return

    this.http.get(API.Leave, {//Get number of robots of available
      params: { course: this.course }
    }).subscribe(res => {
      console.log(res)
      this.buttonLeaveDisabled = true
      this.buttonSignDisabled = false
    }, err => {
      console.error(err)
      alert('网络出现延时，请重试。')
    })
  }
}
