export class Option {
    id: string;
    name: string;
    isAnswer: boolean;
    selected: boolean;
    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.isAnswer = data.isAnswer;
    }
}