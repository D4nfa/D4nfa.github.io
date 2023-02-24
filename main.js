var isHidden = true;
var projects;
var sections = ['about', 'projects', 'rndPage'];
var currSection = 0;

function onLoad(){
    loadProjects().then(() => localizePage());
    loadLangElement();
    addEventListener('langChanged', () => 
    {
        localizePage();
        reloadProjects();
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

function reloadProjects(){
    deleteProjects();
    loadProjects();
}

function projectLoaded(json){
    json = subKeys(projectTemplate, [json[lang], json['GENERAL']]);
    $('projectList').innerHTML += json;
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