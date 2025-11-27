import lang_pt from "./lang/pt.json";
import { Question } from "./question";
import Relations from "./relations";

export class Area {
    _id!: number;
    _lang = lang_pt;
    _porcent!: number;
    
    constructor(id:number, lang:any) {
        this._id = id;
        this._lang = lang;
    }
    get porcent():number {
        return this._porcent;
    }
    set porcent(porcent:number) {
        this._porcent = porcent;
    }
    get id():string {
        return this._id.toString();
    }
    get description():string {
        return this._lang.areas.filter(area => area.id === this._id)[0].description;
    }
    get carreras():string {
        return this._lang.carreras[this._id-1].description;
    }
    get questions():Question[]{
        let questions:Question[] = [];
        let questionsIds = Relations.questionsInAreas().filter(relation => relation.areaId === this._id)[0].questionsId;
        questionsIds.forEach((questionId) => {
            questions.push(new Question(questionId, this._lang));
        });
        return questions;
    }

}
