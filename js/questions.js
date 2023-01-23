Object.defineProperty( Array.prototype,'has',
         {
            value:function(o){return (this.indexOf(o)!=-1)},
            writable:false,
            enumerable:false
         }
   );

var area1 = [4,9,12,20,28,31,35,39,43,46,50,65,67,68,75,77];
var area2 = [6,13,23,25,34,37,38,42,49,52,55,63,66,70,72,78];
var area3 = [5,10,15,19,21,26,29,33,36,44,53,56,59,62,71,80];
var area4 = [1,7,11,17,18,24,30,41,48,51,58,60,61,64,73,79];
var area5 = [2,3,8,14,16,22,27,32,40,45,47,54,57,69,74,76];

var a1 = a2 = a3 = a4 = a5 = 0;

function areas () {
	for (i=0;i<=questions.length-1;i++)
		{
			if (document.getElementsByName('preguntas'+i)[0].checked)
			{
				if (area1.has(i+1)) a1++;
				else if (area2.has(i+1)) a2++;
				else if (area3.has(i+1)) a3++;
				else if (area4.has(i+1)) a4++;
				else if (area5.has(i+1)) a5++;
			}
		}

}

function porcent(x)
{
   return Math.floor((x*100)/(a1+a2+a3+a4+a5));
}  

function process()
{
	if (radios_ok())
	{
		areas ();
		writeAreas([porcent(a1),porcent(a2),porcent(a3),porcent(a4),porcent(a5)]);
	}
}

function radios_ok()
{
	for (i=0;i<=questions.length-1;i++)
	{
		var radiogrup = document.getElementsByName('preguntas'+i);
		if (!((radiogrup[0].checked)||(radiogrup[1].checked)))
		{
			alert ('Debe responder todas las preguntas');
			return false;
		}
	}
	return true;
}

function randownchecked()
{
	return (Math.floor(Math.random()*2));
}

function createRadio(i)
{
	radio = document.createElement("input");
	radio.type ='radio';
	radio.name = 'preguntas'+(i-1);
	return radio;
}
function addRow(i)
{
	var newRow = document.createElement("tr");
	
	var newCol1 = document.createElement("td");
	var newCol2 = document.createElement("td");
	var newCol3 = document.createElement("td");
	var newCol4 = document.createElement("td");
	
	var numero = document.createTextNode(i);
	var questionTxt = document.createTextNode(questions[i-1]);

	newCol1.appendChild(numero);
	newCol2.appendChild(questionTxt);
	newCol3.appendChild(createRadio(i));
	newCol4.appendChild(createRadio(i));
	
	newRow.appendChild(newCol1);
	newRow.appendChild(newCol2);
	newRow.appendChild(newCol3);
	newRow.appendChild(newCol4);  
	
	document.getElementById('table').getElementsByTagName("tbody")[0].appendChild(newRow);
}
function writeQuestions ()
{

	for (i=1;i<=questions.length;i++)
		addRow(i);

}

function writeAreas(areasPorcent) {

	const results = document.getElementsByClassName('areas')[0];

	for (var i = 0; i <= 4; i++) {
		var h1 = document.createElement('h1');
		var p = document.createElement('p');

		h1.innerText = areasEstudio[i] + ' ' + areasPorcent[i] + ' %';
		p.innerText = carreras[i];

		results.appendChild(h1);
		results.appendChild(p);
	}

	const table = document.getElementsByTagName("table")[0];
	table.innerHTML = "";
}

window.onload = writeQuestions;