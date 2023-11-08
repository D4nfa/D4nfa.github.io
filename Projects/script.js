var projects = [];
var projectElems = [];
var tags;
//Object.keys(json).forEach(tag => {
function onLoad(){
	fetch(`./tags.json`).then((response) => response.json().then((json) =>{ 
		tags = json;
		
		loadProjects().then(() => {

			localizePage();
		});
	}));
    loadLangElement();
    addEventListener('langChanged', () => 
    {
        localizePage();
        localizeProjects();
    });
	
	
}


//PROJECT LOADING
function loadProjects(){
	return fetch(`./projects.json`).then((response) => response.json().then(async (json) => {
		let prjcts = [];

		for(let i = 0; i < json.length; i++){
			let path = json[i];
			prjcts.push(await getPrjct(path['link']));
		}

		async function getPrjct(prjct){
			return await fetch(`./${prjct}/info.json`)
			.then((response) => response.json()
			.then((json) => { return json; }));
		}

		prjcts.forEach(project => {
			projectLoaded(project);
		});
	}));
}

function projectLoaded(json){
    projects.push(json);
    document.getElementById('prjctContainer').innerHTML += subKeys(projectTemplate, [json['GENERAL']]);
	
	var tagContainer = document.querySelector(`[PRJCTID=${json['GENERAL']['PRJCTID']}]`).getElementsByClassName(`tagDiv`)[0];
	json['GENERAL']['TAGS'].forEach(element => {
		tagContainer.innerHTML += `<img src="${tags[element]['iconLink']}" style="width:25px;">`;
	});
	
	projectElems.push(document.querySelector(`[PRJCTID=${json['GENERAL']['PRJCTID']}]`));

	localizeProject(json);
}


//LOCALIZATION
function localizeProjects(){
    for(let i = 0; i < projects.length; i++){
        subKeysAtr(document.querySelectorAll(`[PRJCTID=${projects[i]['GENERAL']['PRJCTID']}]`)[0], [projects[i][lang], projects[i]['GENERAL']]);
    }
}

function localizeProject(project){
	subKeysAtr(document.querySelectorAll(`[PRJCTID=${project['GENERAL']['PRJCTID']}]`)[0], [project[lang], project['GENERAL']]);
}

function localizePage(){
	fetch(`./local.json`)
	.then((response) => response.json()
	.then((json) => 
	{
		subKeysAtr(document.getElementsByTagName('html')[0], [json[lang], json['GENERAL']]);
	}));
}


//TODO: IMPLEMENT SEARCH FEATURES 
//* SEARCH BY NAME 
//* SEARCH BY TAGS