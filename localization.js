//Function that substitues keys in a text with key value pairs
//Expects keys to be in an array to allow for use of multiple keysets
function subKeys(template, keys) {
    for(let keyset of keys){
        for (let key of Object.keys(keyset)) {
            template = template.replaceAll(`{${key}}`, keyset[key]);
        }
    }
    return template;
}

function subKeysDoc(doc, keys){
    let nodes = doc.querySelectorAll('[localize]');
    for(let keyset of keys){
        for (let key of Object.keys(keyset)) {
            for(let node of nodes){
                node.innerHTML = node.innerHTML.replaceAll(`{${key}}`, keyset[key]);
            }
        }
    }
}

function getLang(){
    return localStorage.getItem('lang');
}

//Change language parameter and reload website
function changeLang(nLang){
    if(nLang == lang) return;

    localStorage.setItem('lang', nLang);
    location.reload();
}

function loadLangElement(){
    document.getElementById('langElement').insertAdjacentHTML("afterend", langElement);
    document.getElementById(lang + '-FLAG').classList.add('selected');
}