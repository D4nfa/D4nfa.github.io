const changeEvent = new Event('langChanged');

var lang = getLang();

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

function subKeysAtr(doc, keys){
	let nodes = doc.querySelectorAll('[localize]');
	for(let keyset of keys){
		for (let key of Object.keys(keyset)) {
			for(let node of nodes){
				if(node.getAttribute('localize') != key) continue;
				node.innerHTML = keyset[key];
			}
		}
	}
}

function getLang(){
	if(localStorage.getItem('lang') != undefined){
		return localStorage.getItem('lang');
	}
	return 'DK';
}

//Set language and dispatch langChanged event
function changeLang(nLang){
	if(nLang == lang) return;
	localStorage.setItem('lang', nLang);

	console.log(lang, nLang);
	document.getElementById(lang + '-FLAG').classList.remove('selected');
	document.getElementById(nLang + '-FLAG').classList.add('selected');

	lang = nLang;
	this.dispatchEvent(changeEvent);
}

function loadLangElement(){
	document.getElementById('langElement').insertAdjacentHTML("afterend", langElement);
	document.getElementById(lang + '-FLAG').classList.add('selected');
}