Object.defineProperty( Array.prototype,'has',
         {
            value:function(o){return (this.indexOf(o)!=-1)},
            writable:false,
            enumerable:false
         }
   )
var questions =
[
	"Dise�ar programas de computaci�n y explorar nuevas aplicaciones tecnol�gicas para uso del internet.",
	"Criar, cuidar y tratar animales dom�sticos y de campo",
	"Investigar sobre �reas verdes, medio ambiente y cambios clim�ticos",
	"Ilustrar, dibujar y animar digitalmente.",
	"Seleccionar, capacitar y motivar al personal de una organizaci�n/empresa",
	"Realizar excavaciones para descubrir restos del pasado",
	"Resolver problemas de c�lculo para construir edificaciones.",
	"Dise�ar cursos para ense�ar a la gente sobre temas de salud e higiene",
	"Tocar un instrumento, componer m�sica y formar parte de un conjunto musical u orquesta.",
	"Planificar cuales son las metas de una organizaci�n p�blica o privada a mediano y largo plazo.",
	"Dise�ar y planificar la producci�n masiva de art�culos como muebles, autos, equipos de oficina, empaques y envases para alimentos y otros.",
	"Dise�ar logotipos y portadas de una revista",
	"Organizar eventos y atender a sus asistentes.",
	"Atender la salud de personas enfermas.",
	"Controlar ingresos y egresos de fondos y presentar el balance final de una instituci�n",
	"Hacer experimentos con plantas (frutas, �rboles, flores)",
	"Concebir planos para viviendas, edificios y ciudadelas.",
	"Investigar y probar nuevos productos farmac�uticos.",
	"Hacer propuestas y formular estrategias para aprovechar las relaciones econ�micas entre dos pa�ses.",
	"Pintar, hacer esculturas, ilustrar libros de arte, etc.",
	"Elaborar campa�as para introducir un nuevo producto al mercado.",
	"Examinar y tratar los problemas visuales",
	"Defender a clientes individuales o empresas en juicios de diferente naturaleza.",
	"Dise�ar m�quinas que puedan simular actividades humanas.",
	"Investigar las causas y efectos de los trastornos emocionales",
	"Supervisar las ventas de un centro comercial",
	"Atender y realizar ejercicios a personas que tienen limitaciones f�sicas, problemas de lenguaje, etc.",
	"Prepararse para ser modelo profesional.",
	"Aconsejar a las personas sobre planes de ahorro e inversiones.",
	"Elaborar mapas, planos e im�genes para el estudio y an�lisis de datos geogr�ficos.",
	"Dise�ar juegos interactivos electr�nicos para computadora.",
	"Realizar el control de calidad de los alimentos",
	"Tener un negocio propio de tipo comercial.",
	"Analizar los fen�menos pol�ticos y participar activamente en ellos.",
	"Escribir guiones de televisi�n, cuentos, novelas y art�culos period�sticos.",
	"Organizar un plan de distribuci�n y venta de un gran almac�n.",
	"Estudiar las costumbres y la forma de vida de las comunidades rurales y urbanas.",
	"Gestionar y evaluar convenios internacionales de cooperaci�n para el desarrollo social.",
	"Hacer campa�as publicitarias para productos y servicios",
	"Trabajar investigando la reproducci�n de peces, camarones y otros animales marinos.",
	"Fabricar productos alimenticios de consumo masivo",
	"Gestionar y evaluar proyectos de desarrollo en una instituci�n educativa y/o fundaci�n.",
	"Redise�ar y decorar espacios f�sicos en viviendas, oficinas y locales comerciales.",
	"Administrar una empresa de turismo y/o agencias de viaje.",
	"Aplicar m�todos alternativos a la medicina tradicional para atender personas con dolencias de diversa �ndole.",
	"Dise�ar ropa para ni�os, j�venes y adultos.",
	"Investigar organismos vivos para elaborar vacunas.",
	"Manejar y/o dar mantenimiento a dispositivos/aparatos tecnol�gicos en aviones, barcos, radares, etc.",
	"Estudiar idiomas extranjeros �actuales y antiguos- para hacer traducciones.",
	"Restaurar piezas y obras de arte",
	"Revisar y dar mantenimiento a artefactos el�ctricos, electr�nicos y computadoras.",
	"Ense�ar a ni�os de 0 a 5 a�os",
	"Investigar y/o sondear nuevos mercados.",
	"Atender la salud dental de las personas",
	"Tratar a ni�os, j�venes y adultos con problemas psicol�gicos.",
	"Crear estrategias de promoci�n y venta de nuevos productos ecuatorianos en el mercado internacional.",
	"Planificar y recomendar dietas para personas diab�ticas y/o con sobrepeso.",
	"Trabajar en una empresa petrolera en cargos t�cnicos.",
	"Administrar una empresa (familiar, privada o p�blica)",
	"Tener un taller de reparaci�n y mantenimiento de carros, tractores, etc.",
	"Ejecutar proyectos de extracci�n minera y metal�rgica.",
	"Asistir a directivos de multinacionales con manejo de varios idiomas.",
	"Dise�ar programas educativos para ni�os con discapacidad.",
	"Aplicar conocimientos de estad�stica en investigaciones en diversas �reas (social, administrativa, salud, etc.)",
	"Fotografiar hechos hist�ricos, lugares significativos, rostros, paisajes y productos varios.",
	"Trabajar en museos y bibliotecas nacionales e internacionales.",
	"Ser parte de un grupo de teatro.",
	"Producir cortometrajes, spots publicitarios, programas educativos, de ficci�n, etc.",
	"Estudiar la influencia entre las corrientes marinas y el clima y sus consecuencias ecol�gicas.",
	"Estudiar profundamente una religi�n para orientar espiritualmente a las personas que lo necesiten.",
	"Asesorar a inversionistas en la compra de bienes/acciones en mercados nacionales e internacionales.",
	"Participar en la creaci�n de nuevas leyes para mejorar el pa�s.",
	"Explorar el espacio sideral, los planetas , caracter�sticas y componentes.",
	"Mejorar la imagen facial y corporal de las personas aplicando diferentes t�cnicas.",
	"Decorar jardines de casas y parques p�blicos.",
	"Administrar y renovar men�es de comidas en un hotel o restaurante.",
	"Trabajar como presentador de televisi�n, locutor de radio y televisi�n, animador de programas culturales y concursos.",
	"Dise�ar y ejecutar programas de turismo.",
	"Administrar y ordenar adecuadamente la ocupaci�n del espacio f�sico de ciudades, pa�ses etc., utilizando im�genes de sat�lite, mapas.",
	"Organizar, planificar y administrar centros educativos"
];

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
		alert (porcent(a1)+'%    '+porcent(a2)+ '%   '+porcent(a3)+ '%    '+porcent(a4)+ '%    '+porcent(a5)+'%');
	}
}

function radios_ok()
{
	for (i=0;i<=questions.length-1;i++)
	{
		var radiogrup = document.getElementsByName('preguntas'+i);
		if (!((radiogrup[0].checked)||(radiogrup[1].checked)))
		{
			alert ('Falta responder la pregunta '+(i+1));
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
	

    newRow.style.backgroundColor = (i % 2 == 0)?"D4FFD7":"white";      
	
	document.getElementById('table').getElementsByTagName("tbody")[0].appendChild(newRow);
}
function writeQuestions ()
{

	for (i=1;i<=questions.length;i++)
		addRow(i);
	
	btnProcesar = document.createElement("input"); 
	btnProcesar.value = 'Procesar'; 
	btnProcesar.type = 'button'; 
	btnProcesar.onclick = process;
	document.body.appendChild(btnProcesar);

}

window.onload = writeQuestions;