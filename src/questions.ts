import $ from "cash-dom"
import lang_pt from "./lang/pt.json"
import lang_es from "./lang/es.json"

let lang = lang_pt;
const area1 = [4,9,12,20,28,31,35,39,43,46,50,65,67,68,75,77];
const area2 = [6,13,23,25,34,37,38,42,49,52,55,63,66,70,72,78];
const area3 = [5,10,15,19,21,26,29,33,36,44,53,56,59,62,71,80];
const area4 = [1,7,11,17,18,24,30,41,48,51,58,60,61,64,73,79];
const area5 = [2,3,8,14,16,22,27,32,40,45,47,54,57,69,74,76];

let a1 = 0; let a2 = 0; let a3 = 0; let a4 = 0; let a5 = 0;

function areas (questions_size:number) {
	for (let i=0;i<=questions_size-1;i++)
		{
			const questionCheckbox = $(`input[name="preguntas${i}"]`);

			if (questionCheckbox.is(':checked'))
			{
				if (area1.includes(i+1)) a1++;
				else if (area2.includes(i+1)) a2++;
				else if (area3.includes(i+1)) a3++;
				else if (area4.includes(i+1)) a4++;
				else if (area5.includes(i+1)) a5++;
			}
		}
}

function porcent(x:number)
{
   return Math.floor((x*100)/(a1+a2+a3+a4+a5));
}  

function process()
{
	if (radios_ok(lang.questions.length))
	{
		areas(lang.questions.length);
		writeAreas([porcent(a1),porcent(a2),porcent(a3),porcent(a4),porcent(a5)]);
	}
}

function radios_ok(questions_size:number)
{
	for (let i=0;i<=questions_size-1;i++)
	{
		
		let radiogroup = document.getElementsByName('preguntas'+i);
		const check_yes = radiogroup[0] as HTMLInputElement;
		const check_not = radiogroup[1] as HTMLInputElement;
		if (!((check_yes.checked)||(check_not.checked)))
		{
			check_yes.focus();
			alert ('Debe responder todas las preguntas, falta: '+Number(i+1));
			return false;
		}
	}
	return true;
}

function randownchecked()
{
	return (Math.floor(Math.random()*2));
}

function createRadio(i:number)
{
	let radio = document.createElement("input");
	radio.type ='radio';
	radio.name = `preguntas${(i)}`;
	radio.checked = (Math.random() < 0.7);
	return radio;
}

function setQuestions(langQuestions:string[]) {
	let questions = document.querySelectorAll('tr:not(:first-child) td:nth-child(2)');
	
	questions.forEach(function (q, i) {
	   q.innerHTML = langQuestions[i];
	})
	
}
function addRow(i:number)
{
	var newRow = document.createElement("tr");
	
	var newCol1 = document.createElement("td");
	var newCol2 = document.createElement("td");
	var newCol3 = document.createElement("td");
	var newCol4 = document.createElement("td");
	
	var numero = document.createTextNode(String(i+1));

	newCol1.appendChild(numero);
	newCol2.appendChild(document.createTextNode(("")));
	newCol3.appendChild(createRadio(i));
	newCol4.appendChild(createRadio(i));
	
	newRow.appendChild(newCol1);
	newRow.appendChild(newCol2);
	newRow.appendChild(newCol3);
	newRow.appendChild(newCol4);  
	
	$("#table > tbody")[0]!.appendChild(newRow);
}
function writeQuestions ()
{
	$("#btn_procesar").on('click', () => process());
	
	$('#lang').on('change', async function() {
		if ($('#lang').val()==="es")
		    lang = lang_es;
		else if ($('#lang').val()==="pt")
			lang = lang_pt;

		setQuestions(lang.questions);
	})

	lang.questions.forEach((q,i) => addRow(i));

	setQuestions(lang.questions);

}

function writeAreas(areasPorcent:number[]) {

	const results = document.getElementsByClassName('areas')[0];

	for (var i = 0; i <= 4; i++) {
		var h1 = document.createElement('h1');
		var p = document.createElement('p');

		h1.innerText = `${lang.areasEstudio[i]} ${areasPorcent[i]} %`;
		p.innerText = lang.carreras[i];

		results.appendChild(h1);
		results.appendChild(p);
	}

	const table = document.getElementsByTagName("table")[0];
	table.innerHTML = "";
	var button = document.getElementById("btn_procesar") as HTMLInputElement;
	button.style.display = "none";
}
window.onload = writeQuestions;