var isHidden = true;
var lang = 'DK';
var projects;



function onLoad(){
    getLang();
    loadProjects().then((e) => localizePage());
    //Add selected class to img depicting currently selected language
    
    $(lang + '-FLAG').classList.add('selected');
    
}


function getLang(){
    let _lang = localStorage.getItem('lang');
    if(_lang) {lang = _lang}
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
            console.log(`fetching file ${path}`);
            fetch(`./Projects/${path}/info.json`)
            .then((response) => response.json()
            .then((json) => projectLoaded(json)));
        }
    }));
}

function projectLoaded(json){
    json = subKeys(projectTemplate, [json[lang], json['GENERAL']]);
    $('projectList').innerHTML += json;
}

//Change language parameter and reload website
function changeLang(nLang){
    if(nLang == lang) return;

    localStorage.setItem('lang', nLang);
    location.reload();
}

function localizePage(){
    fetch(`./local/homePage.json`)
    .then((response) => response.json()
    .then((json) => 
    {
        let page = document.getElementsByTagName('html')[0].innerHTML
        page = subKeys(page, [json[lang], 'GENERAL']); 
        document.getElementsByTagName('html')[0].innerHTML = page;
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