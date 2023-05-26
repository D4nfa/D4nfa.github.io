var isHidden = true;
var projects = [];
var projectElems = [];

function onLoad(){
    loadProjects().then(() => localizePage(`./local/homePage.json`));
    loadLangElement();
    addEventListener('langChanged', () => 
    {
        localizePage(`./local/homePage.json`);
        localizeProjects();
    });
}

function scrollToAnchor(anchor)
{
	window.scrollTo(0, window.scrollY + $(anchor).getBoundingClientRect().top);
}

function MinMaxNav()
{
	let btn = $("navBtn");
	let div = $("navDiv");
	switch (isHidden) {
		case true:
			btn.classList.remove("navHidden");
			div.classList.remove("hidden");
			div.classList.add("visible");
			break;

		case false:
			div.classList.remove("visible");
			btn.classList.add("navHidden");
			div.classList.add("hidden");
			break;
	}
	isHidden = !isHidden;
}


//Project loading
function deleteProjects(){
	$('projectList').innerHTML = '';
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function loadProjects(){
	return fetch(`./Projects/projects.json`).then((response) => response.json().then((json) => {
		let prjcts = [];
		let seeMore = undefined;
		let prjctCount = 5 > json.length ? json.length : 5;
		
		for(let i = 0; i < prjctCount; i++){
			let path = json.splice(Math.floor(Math.random() * json.length), 1);
			
			fetch(`./Projects/${path[0]['link']}/info.json`)
			.then((response) => response.json()
			.then((json) => prjcts.push(json)))
		}

		fetch(`./Projects/info.json`)
			.then((response) => response.json()
			.then((json) => seeMore = json))

		check();
		
		async function check(){
			if(prjcts.length < prjctCount || seeMore == undefined){
				window.setTimeout(check, 100);
			}
			else{
				prjcts.forEach(element => {
					console.log(element);
					projectLoaded(element);
				});
				projectLoaded(seeMore);
			}
		}

		
	}));
}

function localizeProjects(){ //TODO
    for(let i = 0; i < projects.length; i++){
        subKeysAtr(document.querySelectorAll(`[PRJCTID=${projects[i]['GENERAL']['PRJCTID']}]`)[0], [projects[i][lang], projects[i]['GENERAL']]);
    }
}

function localizeProject(project){
	subKeysAtr(document.querySelectorAll(`[PRJCTID=${project['GENERAL']['PRJCTID']}]`)[0], [project[lang], project['GENERAL']]);
}

function projectLoaded(json){
    projects.push(json);
    $('projectList').innerHTML += subKeys(projectTemplate, [json['GENERAL']]);

	projectElems.push(document.querySelector(`[PRJCTID=${json['GENERAL']['PRJCTID']}]`));

	localizeProject(json);
}


//Evaluate url params
function evalParams(params)
{
	if (!params || window.location.href.indexOf('?') < 0) 
	{
		return;
	}

	let qstr = new URLSearchParams(params);
	for(let param of qstr.entries())
	{
		switch(param[0])
		{
		}
	}
}
evalParams(window.location.href.slice(window.location.href.indexOf('?') + 1));

async function ScrollProjects(){
	let div = document.getElementById('projectList');
	div.style.transform = `translateX(${1200}px)`
}