import { Question } from "./question";
import { UI, qs } from "./ui";

export default class Table {
    public static addRow(i: number, question:Question, labels:{yes:string,no:string}, dataIndex?: number, selected?: boolean|null) {
        const list = qs(UI.questionList);
        if (!list) return;

        const row = document.createElement("div");
        row.className = "question-row";
        row.dataset.questionIndex = (dataIndex ?? i).toString();

        const text = document.createElement("div");
        text.className = "question-text";
        text.textContent = question.description;

        const toggle = Table.createToggle(i, labels, selected);

        row.appendChild(text);
        row.appendChild(toggle);

        list.appendChild(row);
      }

     public static createToggle(i:number, labels:{yes:string,no:string}, selected?: boolean|null) {
        const container = document.createElement("div");
        container.className = "toggle";

        const yesBtn = document.createElement("button");
        yesBtn.type = "button";
        yesBtn.className = "option-btn";
        yesBtn.dataset.value = "yes";
        yesBtn.dataset.index = `${i}`;
        yesBtn.textContent = labels.yes;

        const noBtn = document.createElement("button");
        noBtn.type = "button";
        noBtn.className = "option-btn";
        noBtn.dataset.value = "no";
        noBtn.dataset.index = `${i}`;
        noBtn.textContent = labels.no;

        if (selected === true) yesBtn.classList.add("selected");
        if (selected === false) noBtn.classList.add("selected");

        container.appendChild(yesBtn);
        container.appendChild(noBtn);
        return container;
     }
}
