import { User } from './user';
import { Question } from './question';

export class Exam {
    name: string;
    id: string;
    description: string;
    time: number;
    questionNumber: number;
    available: boolean;
    createdAt: string;
    users: any[];
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.time = data.time;
            this.questionNumber = data.questionNumber;
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}