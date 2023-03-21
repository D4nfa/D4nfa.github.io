var projects = [];
var projectElems = [];

function onLoad(){
    loadProjects().then(() => {

        localizePage();
    });
    loadLangElement();
    addEventListener('langChanged', () => 
    {
        localizePage();
        localizeProjects();
    });
}


//PROJECT LOADING
function loadProjects(){
	return fetch(`./projects.json`).then((response) => response.json().then((json) => {
		let prjcts = [];

		json.forEach(path => {
			fetch(`./${path}/info.json`)
			.then((response) => response.json()
			.then((json) => prjcts.push(json)))
		})
        
		check();

		async function check(){
			if(prjcts.length < json.length - 1){
				window.setTimeout(check, 100);
			}
            else{
                prjcts.forEach(project => {
					projectLoaded(project);
				});
            }
		}
	}));
}

function projectLoaded(json){
    projects.push(json);
    document.getElementById('prjctContainer').innerHTML += subKeys(projectTemplate, [json['GENERAL']]);

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