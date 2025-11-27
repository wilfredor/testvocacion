import { Area } from "./area";
import lang_pt from "./lang/pt.json";
import { getTestConfig } from "./tests";

const CONFIG = getTestConfig();

export class Question {
    _id!: number;
    _lang!:any;
    
    constructor(id:number, lang:any) {
        this._id = id;
        this._lang = lang;
    }
    get id():string {
        return this._id.toString();
    }
    get description():string {
        return this._lang.questions.filter((question: { id: number; }) => question.id === this._id)[0].description;
    }

    get area():Area {
        const areaId = CONFIG.items.find(item => item.id === this._id)?.areaId ?? 1;
        return new Area(areaId,this._lang);
    }

}
