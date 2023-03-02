var isHidden = true;
var projects = [];
var projectElems = [];

function onLoad(){
    loadProjects().then(() => localizePage());
    loadLangElement();
    addEventListener('langChanged', () => 
    {
        localizePage();
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

function loadProjects(){
	return fetch(`./Projects/projects.json`).then((response) => response.json().then((json) => {
		for(let path of json){
			fetch(`./Projects/${path}/info.json`)
			.then((response) => response.json()
			.then((json) => projectLoaded(json)));
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
	
	alignProjects();
}



function localizePage(){
	fetch(`./local/homePage.json`)
	.then((response) => response.json()
	.then((json) => 
	{
		subKeysAtr(document.getElementsByTagName('html')[0], [json[lang], json['GENERAL']]);
	}));
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