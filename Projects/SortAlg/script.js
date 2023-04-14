const canvas = document.querySelector('canvas');
const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const listInput = document.querySelector('#listInput');
const rangeIn = document.querySelector('#rangeIn');
const selAlgo = document.querySelector('#algoDrop');

async function onLoad(){
	localizePage('local.json');
	addEventListener('langChanged', () => localizePage('local.json'));
	loadLangElement();

	populateAlgs();
}


function genList(){
	writeList(Array.from({length: rangeIn.value}, (_, i) => i + 1).sort((a, b) => 0.5 - Math.random()));
	drawList(readList());
}

function readList(){
	return listInput.value.split(',').map( Number );
}

function writeList(list){
	listInput.value = list.toString();
}

function drawList(list){
	let min = Infinity;
	let max = 0;
	for(let i = 0; i < list.length; i++){
		if(list[i] > max){ max = list[i]};
		if(list[i] < min){ min = list[i]};
	}
	ctx.clearRect(0, 0, rect.width, rect.height)
	ctx.fillStyle = "silver";
	let pillarWidth = rect.width / list.length;
	for(x = 0; x < list.length; x++){
		let pillarHeight = (list[x] - min) / (max - min) * rect.height;
		ctx.fillRect(x * pillarWidth, rect.height - pillarHeight, pillarWidth, pillarHeight);
	}
}

const algorithms = {
	Bubble: 0

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(array, index1, index2){
	return [array[index1], array[index2]] = [array[index2], array[index1]];
}


async function sort(){
	let arr = readList();
	let n = arr.length;
	switch(algorithms[selAlgo.options[selAlgo.selectedIndex].value]){
		case 0:
			var i, j;
			for (i = 0; i < n-1; i++)
			{
				for (j = 0; j < n-i-1; j++)
				{
					if (arr[j] > arr[j+1])
					{
						swap(arr,j,j+1);
					}
					drawList(arr);
					await sleep(1);
				}
			
			}	
			
		break;
	}
}

function populateAlgs(){
	let algoDrop = document.querySelector('#algoDrop');
	for(let key of Object.keys(algorithms)){
		let option = document.createElement("option");
		option.text = key;
		algoDrop.add(option);
	}
}