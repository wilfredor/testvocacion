import lang_pt from "./lang/pt.json";
import { Question } from "./question";
import { getTestConfig } from "./tests";
import { Lang } from "./types";

const CONFIG = getTestConfig();

export class Area {
    _id!: number;
    _lang: Lang = lang_pt;
    _porcent!: number;
    
    constructor(id:number, lang:Lang) {
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
        return this._lang.areas.find((area) => area.id === this._id)?.description ?? "";
    }
    get carreras():string {
        return this._lang.carreras[this._id-1]?.description ?? "";
    }
    get questions():Question[]{
        const questions:Question[] = [];
        const questionsIds = CONFIG.items.filter(item => item.areaId === this._id).map(item => item.id);
        questionsIds.forEach((questionId) => {
            questions.push(new Question(questionId, this._lang));
        });
        return questions;
    }

}
