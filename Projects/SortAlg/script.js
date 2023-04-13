const canvas = document.querySelector('canvas');
const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

async function onLoad(){
	localizePage();
	addEventListener('langChanged', () => localizePage());
	loadLangElement();
	main();
	
}

let listToSort = [];

function genList(r){
	listToSort = [];
	listToSort = Array.from({length: r}, (_, i) => i + 1)
	listToSort = listToSort.sort((a, b) => 0.5 - Math.random());
	console.log(toString(listToSort));
}

function drawList(){
	let min = 1;
	let max = 0;
	for(let i = 0; i < listToSort.length; i++){
		if(listToSort[i] > max){ max = listToSort[i]};
		if(listToSort[i] < min){ min = listToSort[i]};
	}
	ctx.clearRect(0, 0, rect.width, rect.height)
	ctx.fillStyle = "silver";
	let pillarWidth = rect.width / listToSort.length;
	for(x = 0; x < listToSort.length; x++){
		let pillarHeight = (listToSort[x] - min) / (max - min) * rect.height;
		ctx.fillRect(x * pillarWidth, rect.height - pillarHeight, pillarWidth, pillarHeight);
	}
}


function localizePage(){
	if(!this.localData){
		fetch(`local.json`)
		.then((response) => response.json()
		.then((json) => 
		{
			subKeysAtr(document,  [json[lang], json['GENERAL']]);
			this.localData = json;
		}));
	}else{
		subKeysAtr(document,  [this.localData[lang], this.localData['GENERAL']]);
	}
}