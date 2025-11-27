import { Question } from "./question";
import { UI, qs } from "./ui";

export default class Table {
    public static addRow(i: number, question:Question, labels:{yes:string,no:string}) {
        const list = qs(UI.questionList);
        if (!list) return;

        const row = document.createElement("div");
        row.className = "question-row";

        const text = document.createElement("div");
        text.className = "question-text";
        text.textContent = question.description;

        const toggle = Table.createToggle(i, labels);

        row.appendChild(text);
        row.appendChild(toggle);

        list.appendChild(row);
      }

     public static createToggle(i:number, labels:{yes:string,no:string}) {
        const container = document.createElement("div");
        container.className = "toggle";

        const yesLabel = document.createElement("label");
        const yesInput = document.createElement("input");
        yesInput.type = "radio";
        yesInput.name = `question${i}`;
        yesInput.value = "yes";
        const yesSpan = document.createElement("span");
        yesSpan.textContent = labels.yes;
        yesLabel.appendChild(yesInput);
        yesLabel.appendChild(yesSpan);

        const noLabel = document.createElement("label");
        const noInput = document.createElement("input");
        noInput.type = "radio";
        noInput.name = `question${i}`;
        noInput.value = "no";
        const noSpan = document.createElement("span");
        noSpan.textContent = labels.no;
        noLabel.appendChild(noInput);
        noLabel.appendChild(noSpan);

        container.appendChild(yesLabel);
        container.appendChild(noLabel);
        return container;
     }
}
