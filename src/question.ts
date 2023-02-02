import { Area } from "./area";
import lang_pt from "./lang/pt.json";
import Relations from "./relations";

export class Question {
    _id!: number;
    _lang = lang_pt;
    
    constructor(id:number, lang:any) {
        this._id = id;
        this._lang = lang;
    }
    get id():string {
        return this.id;
    }
    get description():string {
        return this._lang.questions.filter(question => question.id === this._id)[0].description;
    }

    get area():Area {
        return new Area(Relations.questionsInAreas().filter(relation => relation.questionsId.includes(this._id))[0].areaId,this._lang);
    }

}