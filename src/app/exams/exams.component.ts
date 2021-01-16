import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from '../shared/exam';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {


  exams: Exam[] = [];
  searchText;
  spinner: boolean = true;
  questionNumber: number = 0;

  quizLink: string;
  quizType: string;
  quizTypeAR: string;



  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
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
    if (this.quizType == 'all_math') {
      this.quizTypeAR = 'امتحان رياضيات شامل';
      this.quizLink = 'allMathExams';
    }
    else if (this.quizType == 'all_IQ') {
      this.quizTypeAR = 'امتحان اسئلة ذكاء شامل';
      this.quizLink = 'allIQExams';
    }
    else if (this.quizType == 'all_geometry') {
      this.quizTypeAR = 'امتحان هندسة شامل';
      this.quizLink = 'allGeometryExams';
    }
    else if (this.quizType == 'all_problem') {
      this.quizTypeAR = 'امتحان مشاكل شامل';
      this.quizLink = 'allProblemExams';
    }
    else if (this.quizType == 'all_parts') {
      this.quizTypeAR = 'امتحان شامل لكل الاقسام';
      this.quizLink = 'allPartsExams';
    }
  }

  get sortData() {
    return this.exams.sort((a, b) => {
      return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
    });
  }

}
