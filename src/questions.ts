import $ from "cash-dom";
import table from "./table";
import Relations from "./relations";
import { Question } from "./question";
import { Area } from "./area";

let lang:any;

function areasCount () {
	let areasCount = [0, 0, 0, 0, 0];
	const questionCheckboxes:Array<HTMLInputElement> = Array.from(document.querySelectorAll('input[name^="question"]'));
	questionCheckboxes.forEach((checkbox, i) => {
	  if ($(checkbox).is(":checked")) {
		Relations.questionsInAreas().forEach((area, j) => {
		  if (area.questionsId.includes(i+1)) {
			areasCount[j]++;
		  }
		});
	  }
	});
	return areasCount;
}

function porcent(x:number,area:number[])
{
   const sum =  area.reduce((a, b) => a + b, 0);
   return Math.floor((x*100)/sum);
}  

function process()
{
	if (radiosValidation(lang.questions.length))
	{
		const counts = areasCount();
		const porcents = counts.map((areaCount: number) => porcent(areaCount, counts));
		writeAreas(porcents);
	}
}

function radiosValidation(questions_size: number): boolean {
	for (let i = 0; i <= questions_size - 1; i++) {
	  let radiogroup = document.getElementsByName(`question${i}`) as NodeListOf<HTMLInputElement>;
	  const check_yes = radiogroup[0];
	  const check_not = radiogroup[1];
	  if (!(check_yes.checked || check_not.checked)) {
		check_yes.focus();
		check_yes.parentElement!.parentElement!.style.background = 'lightcoral';
		alert(`${lang.labels.AllQuestionsNeedToBeAnswered} ${i + 1}`);
		return false;
	  }
	}
	return true;
  }

function setHeaderText(activity:string) {
	document.getElementById('Activity')!.innerHTML = activity;
}

function setQuestions(lang:any) {
	let questionsRow = document.querySelectorAll('tr:not(:first-child) td:nth-child(2)');

	questionsRow.forEach(function (q, i) {
	   let description = lang.questions.filter((question: { id: number; }) => question.id === (i+1))[0].description;
	   q.innerHTML = description;
	})
}

async function writeQuestions ()
{
	
	$("#btn_procesar").on('click', () => process());
	
	$('#lang').on('change', async function(this:HTMLInputElement) {
		lang = await getLanguage(this.value);
		setQuestions(lang);
		setHeaderText(lang.labels.Activity);
	})

	lang = await getLanguage("pt");

	setQuestions(lang);
	setHeaderText(lang.labels.Activity);

	lang.questions.forEach((_q: any,i: number) => {
		let question = new Question(i+1,lang);
		table.addRow(i,question);
	});
}

async function getLanguage(lang: string):Promise<any> {
	const url = `./src/lang/${lang}.json`;
	const json = (await fetch(url)).text();
	return JSON.parse(await json);
  }

function writeAreas(areasPorcent:number[]) {

	const results = document.getElementsByClassName('areas')[0];
	let areas:Area[] = [];

	for (var i = 1; i < lang.areas.length; i++) {
	    let area = new Area(i,lang);
		area.porcent = areasPorcent[i];
		areas.push(area);
	}

	areas.sort((a, b) => (b.porcent > a.porcent ) ? 1 : -1);

	areas.forEach((area)=>{

		var h1 = document.createElement('h1');
		var p = document.createElement('p');

		h1.innerText = `${area.description} ${area.porcent} %`;
		p.innerText = area.carreras;

		results.appendChild(h1);
		results.appendChild(p);

	});

	const table = document.getElementsByTagName("table")[0];
	table.innerHTML = "";
	var button = document.getElementById("btn_procesar") as HTMLInputElement;
	button.style.display = "none";
}
window.onload = writeQuestions;