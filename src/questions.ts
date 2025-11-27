import $ from "cash-dom";
import table from "./table";
import { Question } from "./question";
import { Area } from "./area";
import langEn from "./lang/en.json";
import langEs from "./lang/es.json";
import langPt from "./lang/pt.json";
import { scoringStrategies } from "./scoring";
import { getTestConfig } from "./tests";
import { TestConfig } from "./types";

const CONFIG: TestConfig = getTestConfig();
const PAGE_SIZE = CONFIG.pageSize;
let lang:any;
let currentPage = 1;
let totalPages = 1;

function areasCount () {
	const answers:Record<number, boolean> = {};
	CONFIG.items.forEach((item, index) => {
		const radioGroup = document.getElementsByName(`question${index}`) as NodeListOf<HTMLInputElement>;
		const yesOption = radioGroup[0];
		answers[item.id] = !!(yesOption && yesOption.checked);
	});
	const strategy = scoringStrategies[CONFIG.scoringStrategy];
	return strategy ? strategy.score(CONFIG, answers) : [];
}

function porcent(x:number,area:number[])
{
   const sum =  area.reduce((a, b) => a + b, 0);
   if (sum === 0) return 0;
   return Math.floor((x*100)/sum);
}  

function process()
{
	if (radiosValidation(CONFIG.items.length))
	{
		hideNotice();
		const counts = areasCount();
		const porcents = counts.map((areaCount: number) => porcent(areaCount, counts));
		writeAreas(porcents, counts);
	}
}

function radiosValidation(questions_size: number): boolean {
	hideNotice();
	for (let i = 0; i <= questions_size - 1; i++) {
	  let radiogroup = document.getElementsByName(`question${i}`) as NodeListOf<HTMLInputElement>;
	  const check_yes = radiogroup[0];
	  const check_not = radiogroup[1];
	  const row = check_yes?.closest(".question-row");
	  if (row) row.classList.remove("row-error");
	  if (!(check_yes.checked || check_not.checked)) {
		check_yes.focus();
		if (row) row.classList.add("row-error");
		showNotice(`${lang.labels.AllQuestionsNeedToBeAnswered} ${i + 1}`);
		return false;
	  }
	}
	return true;
}

function setHeaderText(activity:string) {
	document.getElementById('Activity')!.innerHTML = activity;
}

function setStaticText(lang:any) {
	setHeaderText(lang.labels.Activity);
	document.getElementById('hero-eyebrow')!.textContent = lang.labels.HeroEyebrow;
	document.getElementById('hero-title')!.textContent = lang.labels.HeroTitle;
	document.getElementById('hero-subtitle')!.textContent = lang.labels.HeroSubtitle;
	const yesLabel = document.getElementById('yes-label');
	if (yesLabel) yesLabel.textContent = lang.labels.Yes;
	const processBtn = document.getElementById('btn_procesar') as HTMLInputElement | null;
	if (processBtn) processBtn.value = lang.labels.ProcessButton;
	document.getElementById('results-title')!.textContent = lang.labels.ResultsTitle;
	document.getElementById('btn_prev')!.textContent = lang.labels.Prev;
	document.getElementById('btn_next')!.textContent = lang.labels.Next;
	const langSelect = document.getElementById('lang');
	if (langSelect) langSelect.setAttribute('aria-label', lang.labels.Language);
}

function setQuestions(lang:any) {
	let questionsRow = document.querySelectorAll('.question-row .question-text');

	questionsRow.forEach(function (q, i) {
	   const questionId = CONFIG.items[i]?.id ?? (i+1);
	   let description = lang.questions.filter((question: { id: number; }) => question.id === questionId)[0].description;
	   q.innerHTML = description;
	})
}

function updatePaginationMeta() {
	totalPages = Math.max(1, Math.ceil(CONFIG.items.length / PAGE_SIZE));
}

function showPage(page:number) {
	updatePaginationMeta();
	currentPage = Math.min(Math.max(page, 1), totalPages);
	const rows = document.querySelectorAll('.question-row');
	const start = (currentPage - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;
	rows.forEach((row, idx) => {
		(row as HTMLElement).classList.toggle("hidden", idx < start || idx >= end);
	});
	updatePagerUI();
}

function changePage(delta:number) {
	showPage(currentPage + delta);
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePagerUI() {
	const pageText = document.getElementById('page-text');
	if (pageText) pageText.textContent = `${lang.labels.Page} ${currentPage}/${totalPages}`;
	const prev = document.getElementById('btn_prev') as HTMLButtonElement | null;
	const next = document.getElementById('btn_next') as HTMLButtonElement | null;
	if (prev) prev.disabled = currentPage <= 1;
	if (next) next.disabled = currentPage >= totalPages;
	const processBtn = document.getElementById('btn_procesar') as HTMLInputElement | null;
	if (processBtn) {
		const allAnswered = areAllAnswered();
		processBtn.style.display = currentPage >= totalPages && allAnswered ? "inline-block" : "none";
	}
}

async function writeQuestions ()
{
	
	$("#btn_procesar").on('click', () => process());
	$("#btn_prev").on('click', () => changePage(-1));
	$("#btn_next").on('click', () => changePage(1));
	
	$('#lang').on('change', async function(this:HTMLInputElement) {
		lang = await getLanguage(this.value);
		setStaticText(lang);
		setQuestions(lang);
		resetResults();
		hideNotice();
		updateProgressBar();
		showPage(1);
	})

	lang = await getLanguage("pt");

	setStaticText(lang);
	CONFIG.items.forEach((item, i) => {
		let question = new Question(item.id,lang);
		table.addRow(i,question,{yes: lang.labels.Yes, no: lang.labels.No});
	});
	setQuestions(lang);
	resetResults();
	hideNotice();
	attachRadioListeners();
	updatePaginationMeta();
	showPage(1);
	updateProgressBar();
	updatePagerUI();
}

async function getLanguage(lang: string):Promise<any> {
	const langs:any = {
		en: langEn,
		es: langEs,
		pt: langPt
	}
	return langs[lang] ?? langs.pt;
  }

function writeAreas(areasPorcent:number[], counts:number[]) {

	const results = document.getElementsByClassName('areas')[0];
	const resultsSection = document.querySelector('.results') as HTMLElement | null;
	results.innerHTML = "";
	let areas:Area[] = [];

	for (let i = 0; i < lang.areas.length; i++) {
	    let area = new Area(lang.areas[i].id,lang);
		area.porcent = areasPorcent[i] ?? 0;
		areas.push(area);
	}

	areas.sort((a, b) => (b.porcent > a.porcent ) ? 1 : -1);

	areas.forEach((area, idx)=>{
		const card = document.createElement("div");
		card.className = "area-card";
		if (idx < 3) card.classList.add("top");

		const badge = document.createElement("div");
		badge.className = "badge-rank";
		badge.textContent = `#${idx+1}`;

		const titleRow = document.createElement("div");
		titleRow.className = "area-title-row";

		const h1 = document.createElement('h1');
		h1.className = "area-name";
		h1.innerText = area.description;

		const percent = document.createElement("div");
		percent.className = "area-percent";
		const questionsPerArea = lang.questions.length / lang.areas.length;
		const countValue = counts[lang.areas.findIndex((a:any)=>a.id===area._id)] ?? 0;
		percent.innerText = `${area.porcent}% (${countValue}/${questionsPerArea})`;

		titleRow.appendChild(h1);
		titleRow.appendChild(percent);

		const bar = document.createElement("div");
		bar.className = "bar";
		const barFill = document.createElement("div");
		barFill.className = "bar-fill";
		barFill.style.width = `${area.porcent}%`;
		bar.appendChild(barFill);

		const desc = document.createElement("p");
		desc.className = "area-description";
		desc.innerText = area.carreras;

		const toggle = document.createElement("button");
		toggle.className = "toggle-desc";
		toggle.textContent = lang.labels.ShowCareers;
		toggle.addEventListener("click", () => {
			const expanded = card.classList.toggle("expanded");
			toggle.textContent = expanded ? lang.labels.HideCareers : lang.labels.ShowCareers;
		});

		card.appendChild(badge);
		card.appendChild(titleRow);
		card.appendChild(bar);
		card.appendChild(toggle);
		card.appendChild(desc);

		if (idx >= 3) card.classList.add("hidden");

		results.appendChild(card);
	});

	setupToggleAll();

	const methodNote = document.createElement("div");
	methodNote.className = "method-note";
	methodNote.textContent = buildMethodSummary(areas, counts);
	results.appendChild(methodNote);

	if (resultsSection) {
		resultsSection.classList.remove('hidden');
		resultsSection.classList.add('visible');
	}

	var button = document.getElementById("btn_procesar") as HTMLInputElement;
	button.style.display = "inline-block";
}

function resetResults() {
	const results = document.getElementsByClassName('areas')[0];
	const resultsSection = document.querySelector('.results') as HTMLElement | null;
	results.innerHTML = "";
	if (resultsSection) {
		resultsSection.classList.add('hidden');
		resultsSection.classList.remove('visible');
	}
	const button = document.getElementById("btn_procesar") as HTMLInputElement | null;
	if (button) button.style.display = "inline-block";
}

function randomFill() {
	for (let i = 0; i < lang.questions.length; i++) {
		const radios = document.getElementsByName(`question${i}`) as NodeListOf<HTMLInputElement>;
		const yes = radios[0];
		const no = radios[1];
		const chooseYes = Math.random() >= 0.5;
		if (yes) yes.checked = chooseYes;
		if (no) no.checked = !chooseYes;
		const row = yes?.closest(".question-row");
		if (row) row.classList.remove("row-error");
	}
	updateProgressBar();
}

function showNotice(message:string) {
	const notice = document.getElementById("notice");
	if (!notice) return;
	notice.textContent = message;
	notice.classList.remove("hidden");
}

function hideNotice() {
	const notice = document.getElementById("notice");
	if (!notice) return;
	notice.textContent = "";
	notice.classList.add("hidden");
}

function attachRadioListeners() {
	const radios = document.querySelectorAll('input[type=radio]');
	radios.forEach((radio) => {
		radio.addEventListener('change', () => {
			const row = (radio as HTMLInputElement).closest(".question-row");
			if (row) row.classList.remove("row-error");
			hideNotice();
			updateProgressBar();
		});
	});
}

function updateProgressBar() {
	const total = lang.questions.length;
	let answered = 0;
	for (let i = 0; i < total; i++) {
		const group = document.getElementsByName(`question${i}`) as NodeListOf<HTMLInputElement>;
		if (group[0]?.checked || group[1]?.checked) answered++;
	}
	const progressText = document.getElementById('progress-text');
	if (progressText) progressText.textContent = `${lang.labels.Answered} ${answered}/${total}`;
	const bar = document.getElementById('progress-bar-inner') as HTMLElement | null;
	if (bar) bar.style.width = `${Math.round((answered / total) * 100)}%`;
	updatePagerUI();
}

function setupToggleAll() {
	// no-op: toggle-all removido
}

function areAllAnswered(): boolean {
	for (let i = 0; i < lang.questions.length; i++) {
		const group = document.getElementsByName(`question${i}`) as NodeListOf<HTMLInputElement>;
		if (!(group[0]?.checked || group[1]?.checked)) return false;
	}
	return true;
}

function buildMethodSummary(areas:Area[], counts:number[]): string {
	const total = lang.questions.length;
	const answered = counts.reduce((a,b)=>a+b,0);
	const topCode = areas.slice(0,3).map(a => a.description.charAt(0)).join('');
	const base = lang.labels.MethodNote;
	const prefix = `${lang.labels.MethodSummaryPrefix} ${answered}/${total}.`;
	const code = `${lang.labels.MethodSummaryCode}: ${topCode}.`;
	const scoring = lang.labels.MethodSummaryScoring;
	return `${base} ${prefix} ${code} ${scoring}`;
}
window.onload = writeQuestions;
