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
	writeList(Array.from({length: rangeIn.value}, (_, i) => i + 1).sort(() => 0.5 - Math.random()));
	drawList(readList(), getMinMax(readList()));
}

function readList(){
	return listInput.value.split(',').map( Number );
}

function writeList(list){
	listInput.value = list.toString();
}

function drawList(list, minMax){
	ctx.clearRect(0, 0, rect.width, rect.height)
	ctx.fillStyle = "silver";
	let pillarWidth = rect.width / list.length;
	for(x = 0; x < list.length; x++){
		let pillarHeight = (list[x] - minMax[0]) / (minMax[1] - minMax[0]) * rect.height;
		ctx.fillRect(x * pillarWidth, rect.height - pillarHeight, pillarWidth, pillarHeight);
	}
}

function getMinMax(list){
	let min = Infinity;
	let max = 0;
	for(let i = 0; i < list.length; i++){
		if(list[i] > max){ max = list[i]};
		if(list[i] < min){ min = list[i]};
	}
	return [min, max];
}

function drawPillar(){
	
}

const algorithms = {
	Bubble: 0,
	Selection: 1,
	Insertion: 2,
	Bogo: 3

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(array, index1, index2){
	[array[index1], array[index2]] = [array[index2], array[index1]];
}


async function sort(){
	var arr = readList();
	var n = arr.length;
	var minMax = getMinMax(arr);
	switch(algorithms[selAlgo.options[selAlgo.selectedIndex].value]){
		case 0:
			//Optimized bubble sort
			var i, j;
			for (i = 0; i < n-1; i++)
			{
				let swapped = false;
				for (j = 0; j < n-i-1; j++)
				{
					if (arr[j] > arr[j+1])
					{
						swapped = true;
						swap(arr,j,j+1);
						drawList(arr, minMax);
						await sleep(1);
					}
					
				}
				
				if(!swapped) break;
				
			}	
			break;
		case 1:
			//selection sort
			var i, j;
			for (i = 0; i < n-1; i++)
			{
				var min = i;
				for(j = i+1; j < n; j++){
					if(arr[j] < arr[min]) min = j;
				}
				swap(arr, i, min);
				drawList(arr, minMax);
				await sleep(1);
			}	
			break;
		case 2:
			//Insertion sort
			break;
		case 3:
			//Bogo sort
			while(true){
				var sorted = true;
				for (var i = 0; i < n - 1; i++) {
					if (arr[i] > arr[i+1]) {
						sorted = false;
						break;
					}
				}
				if(sorted) break;
				arr = arr.sort(() => 0.5 - Math.random());
				drawList(arr, minMax);
				await sleep(10);
			}
			break;
	}
	console.log('array sorted');
}

function populateAlgs(){
	let algoDrop = document.querySelector('#algoDrop');
	for(let key of Object.keys(algorithms)){
		let option = document.createElement("option");
		option.text = key;
		algoDrop.add(option);
	}
}