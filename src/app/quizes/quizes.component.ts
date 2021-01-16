import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Chapter } from '../shared/chapter';
import { Exam } from '../shared/exam';
import { Question } from '../shared/question';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

  results: any;
  exams: Exam[] = [];
  searchText;
  spinner: boolean = true;
  questionNumber: number = 0;

  quizLink: string;
  quizType: string;
  quizTypeAR: string;

  chapterId: string;
  chapter: Chapter;


  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(routeData => {
      let data = routeData['chapterData'];
      if (data) {
        this.chapter = data.payload.data();
        this.chapterId = data.payload.id;
      }
    })

    this.route.data.subscribe(routeData => {
      let data = routeData['quizData'];
      if (data) {
        for(let i = 0; i < data.length; i++) {
          this.exams[i] = data[i].payload.doc.data();
          this.exams[i].id = data[i].payload.doc.id;
        }
      }
      this.spinner = false;
    })

    this.route.data.subscribe(data => {
      this.quizType = data.quizType
    });
    if (this.quizType == 'part_math') {
      this.quizTypeAR = 'مزاكرة رياضيات';
      this.quizLink = 'partMath';
    }
    else if (this.quizType == 'part_IQ') {
      this.quizTypeAR = 'مزاكرة اسئلة ذكاء';
      this.quizLink = 'partIQ';
    }
    else if (this.quizType == 'part_geometry') {
      this.quizTypeAR = 'مزاكرة هندسة';
      this.quizLink = 'partGeometry';
    }
    else if (this.quizType == 'part_problem') {
      this.quizTypeAR = 'مزاكرة مشاكل';
      this.quizLink = 'partProblem';
    }
  }

  get sortData() {
    return this.exams.sort((a, b) => {
      return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
    });
  }

}
