import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExamsComponent } from './exams/exams.component';
import { PrivetUnComponent } from './privet-un/privet-un.component';
import { PublicUnComponent } from './public-un/public-un.component';
import { SatComponent } from './sat/sat.component';
import { YosComponent } from './yos/yos.component';
import { ArticlesComponent } from './articles/articles.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { UserResolver } from './resolver/user.resolver';
import { PublicResolver } from './resolver/public.resolver';
import { PrivateResolver } from './resolver/private.resolver';
import { BlogResolver } from './resolver/blog.resolver';
import { ExamResolver } from './resolver/exam.resolver';
import { ExamComponent } from './exam/exam.component';
import { QuizesComponent } from './quizes/quizes.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ArticalComponent } from './artical/artical.component';
import { YosDetailComponent } from './yos-detail/yos-detail.component';
import { YosUnComponent } from './yos-un/yos-un.component';
import { UnPrivetDComponent } from './un-privet-d/un-privet-d.component';
import { UnPublicDComponent } from './un-public-d/un-public-d.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { YosResolver } from './resolver/yos-detail';


import { ChapterResolver } from './resolver/chapter.resolver';
import { ExamsResolver } from './resolver/exams.reslover';
import { QuizesResolver } from './resolver/quizes.resolver';
import { QuizResolver } from './resolver/quiz.resolver';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent, },
  { path: 'sign-in', component: SignInComponent, },
  { path: 'sign-up', component: SignUpComponent, },
  { path: 'forget-password', component: ForgetpasswordComponent, },
  { path: 'public-un', component: PublicUnComponent, },
  { path: 'privet-un', component: PrivetUnComponent, },
  { path: 'articles', component: ArticlesComponent, },
  { path: 'article/:id', component: ArticalComponent, resolve: {data: BlogResolver} },
  { path: 'yos-detail/:id', component: YosDetailComponent, resolve: {data: YosResolver} },
  { path: 'sat', component: SatComponent, },
  { path: 'yos', component: YosComponent, },
  { path: 'yos-universities', component:YosUnComponent, },
  // { path: 'exams', component: ExamsComponent, canActivate: [AuthGuard], },


  { path: 'profile', component: ProfileComponent, resolve: {data: UserResolver} },
  { path: 'forget-password', component: ForgetpasswordComponent},
  { path: 'exam/:id', component: ExamComponent, resolve: {data : ExamResolver} },
  { path: 'private-university/:id', component: UnPrivetDComponent, resolve: {data : PrivateResolver} },
  { path: 'public-university/:id', component: UnPublicDComponent, resolve: {data : PublicResolver} },




  { path: 'partMath', component: ChaptersComponent, data: {quizType: 'part_math'}},
  { path: 'partIQ', component: ChaptersComponent, data: {quizType: 'part_IQ'} },
  { path: 'partGeometry', component: ChaptersComponent, data: {quizType: 'part_geometry'} },
  { path: 'partProblem', component: ChaptersComponent, data: {quizType: 'part_problem'} },

  { path: 'partMath/:chapterId', component: QuizesComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizesResolver}, data: {quizType: 'part_math'}},
  { path: 'partIQ/:chapterId', component: QuizesComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizesResolver}, data: {quizType: 'part_IQ'} },
  { path: 'partGeometry/:chapterId', component: QuizesComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizesResolver}, data: {quizType: 'part_geometry'} },
  { path: 'partProblem/:chapterId', component: QuizesComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizesResolver}, data: {quizType: 'part_problem'} },

  { path: 'partMath/:chapterId/exam/:examId', component: ExamComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizResolver}, data: {quizType: 'part_math'}, canActivate: [AuthGuard] },
  { path: 'partIQ/:chapterId/exam/:examId', component: ExamComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizResolver}, data: {quizType: 'part_IQ'}, canActivate: [AuthGuard] },
  { path: 'partGeometry/:chapterId/exam/:examId', component: ExamComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizResolver}, data: {quizType: 'part_geometry'}, canActivate: [AuthGuard] },
  { path: 'partProblem/:chapterId/exam/:examId', component: ExamComponent, resolve:{ chapterData : ChapterResolver, quizData : QuizResolver}, data: {quizType: 'part_problem'}, canActivate: [AuthGuard] },

  { path: 'allMathExams', component: ExamsComponent, resolve:{ quizData : ExamsResolver}, data: {quizType: 'all_math'} },
  { path: 'allIQExams', component: ExamsComponent, resolve:{ quizData : ExamsResolver}, data: {quizType: 'all_IQ'} },
  { path: 'allGeometryExams', component: ExamsComponent, resolve:{ quizData : ExamsResolver}, data: {quizType: 'all_geometry'} },
  { path: 'allProblemExams', component: ExamsComponent, resolve:{ quizData : ExamsResolver}, data: {quizType: 'all_problem'} },
  { path: 'allPartsExams', component: ExamsComponent, resolve:{ quizData : ExamsResolver}, data: {quizType: 'all_parts'} },

  { path: 'allMathExams/:examId', component: ExamComponent, resolve:{ quizData : ExamResolver }, data: {quizType: 'all_math'} },
  { path: 'allIQExams/:examId', component: ExamComponent, resolve:{ quizData : ExamResolver }, data: {quizType: 'all_IQ'} },
  { path: 'allGeometryExams/:examId', component: ExamComponent, resolve:{ quizData : ExamResolver }, data: {quizType: 'all_geometry'} },
  { path: 'allProblemExams/:examId', component: ExamComponent, resolve:{ quizData : ExamResolver }, data: {quizType: 'all_problem'} },
  { path: 'allPartsExams/:examId', component: ExamComponent, resolve:{ quizData : ExamResolver }, data: {quizType: 'all_parts'} },

  { path: '**',  component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
