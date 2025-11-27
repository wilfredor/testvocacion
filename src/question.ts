import { Area } from "./area";
import { getTestConfig } from "./tests";
import { Lang } from "./types";

const CONFIG = getTestConfig();

export class Question {
    _id!: number;
    _lang!:Lang;
    
    constructor(id:number, lang:Lang) {
        this._id = id;
        this._lang = lang;
    }
    get id():string {
        return this._id.toString();
    }
    get description():string {
        return this._lang.questions.find((question) => question.id === this._id)?.description ?? "";
    }

    get area():Area {
        const areaId = CONFIG.items.find(item => item.id === this._id)?.areaId ?? 1;
        return new Area(areaId,this._lang);
    }

}
