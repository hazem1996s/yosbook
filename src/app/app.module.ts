import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';


import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesComponent } from './articles/articles.component';
import { PublicUnComponent } from './public-un/public-un.component';
import { PrivetUnComponent } from './privet-un/privet-un.component';
import { YosComponent } from './yos/yos.component';
import { SatComponent } from './sat/sat.component';
import { ExamsComponent } from './exams/exams.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

import { UserResolver } from './resolver/user.resolver';
import { PrivateResolver } from './resolver/private.resolver';
import { BlogResolver } from './resolver/blog.resolver';
import { ExamResolver } from './resolver/exam.resolver';
import { PublicResolver } from './resolver/public.resolver';

import { Public_University } from './public_university';
import { UnPublicDComponent } from './un-public-d/un-public-d.component';
import { UnPrivetDComponent } from './un-privet-d/un-privet-d.component';
import { ExamComponent } from './exam/exam.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { YosUnComponent } from './yos-un/yos-un.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticalComponent } from './artical/artical.component';
import { YosDetailComponent } from './yos-detail/yos-detail.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { QuizesResolver } from './resolver/quizes.resolver';
import { ChapterResolver } from './resolver/chapter.resolver';
import { QuizResolver } from './resolver/quiz.resolver';
import { ExamsResolver } from './resolver/exams.reslover';
import { QuizesComponent } from './quizes/quizes.component';
import { YosResolver } from './resolver/yos-detail';

const config = {
  apiKey: "AIzaSyAlCzEPduAd005jHHudc5M4xa0jNHM6ByI",
  authDomain: "yosbook-database.firebaseapp.com",
  projectId: "yosbook-database",
  storageBucket: "yosbook-database.appspot.com",
  messagingSenderId: "895935019881",
  appId: "1:895935019881:web:ac02994eafa3dd7e5edbf8",
  measurementId: "G-VPXCSGD181"
};

const mat = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule, 
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatSnackBarModule,
  MatProgressBarModule
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ArticlesComponent,
    PublicUnComponent,
    PrivetUnComponent,
    YosComponent,
    SatComponent,
    ExamsComponent,
    SignInComponent,
    SignUpComponent,
    ForgetpasswordComponent,
    UnPublicDComponent,
    UnPrivetDComponent,
    ExamComponent,
    BlogsComponent,
    BlogComponent,
    YosUnComponent,
    ProfileComponent,
    ArticalComponent,
    YosDetailComponent,
    ChaptersComponent,
    QuizesComponent,
  ],
  imports: [
    ...mat,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config, 'test-database-f4547'),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule,
    Ng2SearchPipeModule,
  ],
  exports: [
    ...mat,
  ],
  providers: [
    PublicResolver,
    PrivateResolver,
    BlogResolver,
    ExamResolver,
    UserResolver,
    QuizesResolver,
    QuizResolver,
    YosResolver,
    ChapterResolver,
    ExamsResolver,
    Public_University
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
