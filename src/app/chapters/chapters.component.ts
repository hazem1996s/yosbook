import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Chapter } from '../shared/chapter';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

  quizLink: string;
  quizTypeAR: string;
  quizType: string;
  chapters: Chapter[] = [];


  constructor(    
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    ) { }

  ngOnInit(): void {
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
    this.firebaseService.get_collection(this.quizType)
    .subscribe((res: any[]) => {
      for(let i = 0; i < res.length; i++) {
        this.chapters[i] = res[i].payload.doc.data();
        this.chapters[i].id = res[i].payload.doc.id;
      }
    })
  }

  get sortData() {
    return this.chapters.sort((a, b) => {
      return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
    });
  }

}
