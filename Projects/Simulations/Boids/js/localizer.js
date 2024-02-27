localizePage();
addEventListener('langChanged', () => localizePage());


function localizePage(){
	fetch(`./local.json`)
	.then((response) => response.json()
	.then((json) => 
	{
		subKeysAtr(document.getElementsByTagName('html')[0], [json[lang], json['GENERAL']]);
	}));
}