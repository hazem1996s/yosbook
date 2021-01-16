import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


const ALTER_EGOS = ['Eric'];

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  get_user_exams(id) {
    return this.db.collection('users').doc(id).collection('exams').snapshotChanges();
  }

  get_articals(){
    return this.db.collection('blogs').snapshotChanges();
  }

  get_artical(id){
    return this.db.collection('blogs').doc(id).snapshotChanges();
  }

  get_user(id){
    return this.db.collection('users').doc(id).snapshotChanges();
  }

  update_user(collection, id, value){
    return this.db.collection(collection).doc(id).set(value);
  }

  add_document(collection, value){
    return this.db.collection(collection).add(value);
  }

  get_collection(collection){
    return this.db.collection(collection).snapshotChanges();
  }

  get_document(collection, id){
    return this.db.collection(collection).doc(id).snapshotChanges();
  }

  update_document(collection, id, value){
    return this.db.collection(collection).doc(id).set(value);
  }

  get_quizes(quizType, chapterId){
    return this.db.collection(quizType).doc(chapterId).collection('exams').snapshotChanges();
  }

  get_quiz(quizType, chapterId, examId){
    return this.db.collection(quizType).doc(chapterId).collection('exams').doc(examId).snapshotChanges();
  }

  update_exam(collection, id, value){
    return this.db.collection(collection).doc(id).set({
      name: value.name,
      time: value.time,
      description: value.description,
      available: value.available,
    },
    { merge: true });
  }

  delete_document(collection, id){
    return this.db.collection(collection).doc(id).delete();
  }

  add_question(collection, examId, questions){
    return this.db.collection(collection).doc(examId).set({
      questions: questions
    },
    { merge: true });
  }

  submitExam(value) {
    var batch = this.db.firestore.batch();
    const userExam = this.db.firestore.collection('users').doc(value.userId).collection('exams').doc();
    const examUser = this.db.firestore.collection('exams').doc(value.examId).collection('users').doc();
    batch.set(userExam, {
      examName: value.name,
      result: value.result,
    });
    batch.set(examUser, {
      userId: value.userId,
      firstname: value.firstname,
      result: value.result,
    });
    batch.commit().then(() => {
      console.log("Transaction successfully committed!");
    })
    // .catch((error) => {
    //     console.log("Transaction failed: ", error);
    // });
  }

}
