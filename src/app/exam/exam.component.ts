import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../shared/question';
import { Exam } from '../shared/exam';
import { Option } from '../shared/option';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { QuizConfig } from '../shared/quiz-config';
import { FirebaseService } from '../services/firebase.service';



@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],

  animations: [
    flyInOut(),
    visibility(),
    expand()
  ],
})
export class ExamComponent implements OnInit {

  exam: Exam = new Exam(null);

  mode = 'quiz';
  trueQuestions: number = 0;
  falseQuestions: number = 0;
  start: boolean = false;
  comment: string;
  visibility = 'shown';
  spinner: boolean = true;
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  user: any;
  userId: string;

  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private firebaseService: FirebaseService,
    private location: Location
    ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['quizData'];
      if (data) {
        this.exam = data.payload.data();
        this.exam.id = data.payload.id;
        this.spinner = false;
      }
    })

    this.userId = JSON.parse(localStorage.getItem('user')).uid;
    this.firebaseService.get_user(this.userId)
    .subscribe((user) => {
      this.user = user.payload.data();
    })
  }

  backClicked() {
    this.location.back();
  }

  loadQuiz(exam) {
    if(exam) {
      this.exam = new Exam(exam);
      this.pager.count = this.exam.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.exam.time);
      this.mode = 'quiz';
      // console.log(this.exam.questions[0].answered)
      // localStorage.setItem('exam', JSON.stringify(this.exam));
    }
  }
  
  startExam() {
    this.start = true;
    this.loadQuiz(this.exam)
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.exam.time) {
      clearInterval(this.timer)
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.exam.questions) ?
      this.exam.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    question.options.forEach((x) => {
      if (x.id !== option.id) x.selected = false;
    });
  }

  goTo(index: number) {
    this.visibility = 'shown';
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
    else {
      this.onSubmit()
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'right' : 'wrong';
  };

  getResult() {
    let trueAnswer = 0;
    let wrongAnswer = 0;
    for(let i = 0; i < this.exam.questions.length; i++) {
      if(this.isCorrect(this.exam.questions[i]) == 'right'){
        trueAnswer += 1;
        this.trueQuestions = trueAnswer;
      }
      else {
        wrongAnswer += 1;
        this.falseQuestions = wrongAnswer;
      }
    }
    return Math.round((trueAnswer / this.exam.questions.length) * 100);
  }

  getSmile() {
    if(this.getResult() == 100) {
      this.comment = 'انت عبقري! 😊🥰 معلوماتك ممتازة جداً, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() < 100 && this.getResult() > 80) {
      this.comment = 'احسنت! 😃 معلوماتك جيدة جداً, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() < 80 && this.getResult() > 50) {
      this.comment = 'جيد! 😅 لديك كم جيّد من المعلومات, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() < 50 && this.getResult() > 0) {
      this.comment = 'لا بأس! 🙁 عليك الاهتمام بثقافتك اكثر, جرب نفسك مرة أُخرى في ';
    }
    else if(this.getResult() == 0) {
      this.comment = 'انت فاشل!! 🙂 جرب نفسك مرة أُخرى في';
    }
  }

  onSubmit() {
    let answers = [];
    this.exam.questions.forEach(x => answers.push({ 'quizId': this.exam.id, 'questionId': x.id, 'answered': x.answered }));
    this.getResult();
    this.getSmile();
    this.mode = 'result';
    const formData = {
      examId: this.exam.id,
      name: this.exam.name,
      result: this.getResult(),
      userId: this.userId,
      firstname: this.user.name,
    };
    console.log(formData)
    this.firebaseService.submitExam(formData)
  }
}
