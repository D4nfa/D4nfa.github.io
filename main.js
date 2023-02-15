var isHidden = true;
var lang = 'DK';
var project;

onLoad();


function onLoad(){
    fetch(`./Projects/projects.json`).then((response) => response.json().then((json) => loadProjects(json)));
    
}

function loadProjects(projectPaths){
    for(let path in projectPaths){
        fetch(`./Projects/${path}/info.json`).then((response) => response.json().then((json) => projectLoaded(json)));
    }
}

function projectLoaded(json){
    json = subKeys(projectTemplate, [json[lang], json['GENERAL']]);
    $('projectList').innerHTML += json;
}

function MinMaxNav()
{
    var btn = $("navBtn");
    var div = $("navDiv");
    switch (isHidden) {
        case true:
            btn.classList.remove("navHidden");
            div.classList.remove("hidden");
            break;

        case false:
            btn.classList.add("navHidden");
            div.classList.add("hidden");
            break;
    }
    isHidden = !isHidden;
}