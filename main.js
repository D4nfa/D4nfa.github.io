var isHidden = true;
var lang = 'DK';
var project;




function onLoad(){
    localizePage();
    loadProjects();
    //Add selected class to img depicting currently selected language
    
    $(lang + '-FLAG').classList.add('selected');
    
}


function scrollTo(anchor)
{
    window.scrollTo(0, $(anchor).offset().top-85);
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


//Project loading
function deleteProjects(){
    $('projectList').innerHTML = '';
}

function loadProjects(){
    fetch(`./Projects/projects.json`).then((response) => response.json().then((json) => {
        for(let path of json){
            console.log(`fetching file ${path}`);
            fetch(`./Projects/${path}/info.json`).then((response) => response.json().then((json) => projectLoaded(json)));
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
    if(window.location.href.indexOf('?') < 0)
    {
        window.location.href += `?lang=${nLang}&`;
    }
    let urlParam = new URLSearchParams(window.location.href.slice(window.location.href.indexOf('?') + 1));
    for(let param of urlParam.entries()){
        switch(param[0]){
            case 'lang':
                localStorage.setItem('scrollpos', window.scrollY);
                window.location.href = window.location.href.replaceAll(`${param[0]}=${param[1]}&`, `${param[0]}=${nLang}&`);
                break;
        }
    }
}

function localizePage(){
    fetch(`./local/homePage.json`).then((response) => response.json().then((json) => {
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
        changeLang(lang);
        return;
    }

    let qstr = new URLSearchParams(params);
    for(let param of qstr.entries())
    {
        console.log(`${param[0]}${param[1]}`);
        switch(param[0])
        {
            //change website language
            case 'lang':
                lang = param[1];
                break;
        }
    }
}
evalParams(window.location.href.slice(window.location.href.indexOf('?') + 1));