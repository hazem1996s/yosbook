import { Option } from './option';

export class Question {
    id: number;
    image: string;
    optionType: string;
    options: Option[];
    answered: boolean = false;
    constructor(data: any) {
        data = data || {};
        this.image = data.image;
        this.optionType = data.optionType;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
