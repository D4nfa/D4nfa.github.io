const canvas = document.querySelector('canvas');
const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const listInput = document.querySelector('#listInput');
const rangeIn = document.querySelector('#rangeIn');
const selAlgo = document.querySelector('#algoDrop');

const descBox = document.querySelector('#desc');

async function onLoad(){
	localizePage('local.json');
	addEventListener('langChanged', () => localizePage('local.json'));
	loadLangElement();

	populateAlgs();
	changedAlgo();
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

function drawRecursive(list, N, index, minMax){
	ctx.fillStyle = "silver";
	let pillarWidth = rect.width / N;
	for(x = index; x < index + list.length; x++){
		let pillarHeight = (list[x] - minMax[0]) / (minMax[1] - minMax[0]) * rect.height;
		ctx.clearRect(x * pillarWidth, 0, pillarWidth, rect.height);
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
	Bitonic: 3,
	Merge: 4,
	Heap: 5,
	Bogo: 9

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
			var i, key, j;
			for(i = 1; i < n; i++){
				key = arr[i];
				j = i - 1;

				while(j >= 0 && arr[j] > key){
					swap(arr, j+1, j);
					j = j - 1;
					drawList(arr, minMax);
					await sleep(1);
				}

			}
			break;
		case 3:
			var k, j, l, i;
			for (k = 2; k <= n; k *= 2) {
				for (j = k/2; j > 0; j /= 2) {
					for (i = 0; i < n; i++) {
						l = i ^ j;
						if (l > i) {
							if ( ((i&k)==0) && (arr[i] > arr[l]) || ( ( (i&k)!=0) && (arr[i] < arr[l])) )  {
								swap(arr, i, l);
								drawList(arr, minMax);
								await sleep(1);
							}
						}
					}
				}
			}
			break;
		case 4:

			//Drawlist(currArr, n, index, minMax)
			//Merge sort, gotta do quite a bit of fixing on this
			drawList(arr, minMax);
			

			arr = await mergeSort(arr, 0);
			async function mergeSort(arra, index) {
				

				const half = arra.length / 2
			  
				if (arra.length < 2){
				  return arra;
				}

				
			  
				const left = arra.splice(0, half);
				let e = merge(await mergeSort(left, 0), await mergeSort(arra, index + half - 1));
				
				drawRecursive(arra, n, index, minMax);
				await sleep(1);

				return e;
			}

			async function merge(left, right) {
				let arr1 = []
			
				while (left.length && right.length) {
					if (left[0] < right[0]) {
						arr1.push(left.shift())
					} else {
						arr1.push(right.shift())
					}
				}
				return [ ...arr1, ...left, ...right ]
			}
			break;
		case 5:
			drawList(arr, minMax);
			await sleep(1);
			
			arr = await heapSort(arr);
			async function heapSort(array) {
				let size = array.length
			  
				for (let i = Math.floor(size / 2 - 1); i >= 0; i--){
					heapify(array, size, i)
					drawList(array, minMax);
					await sleep(1);
				}
				  
				

				for (let i = size - 1; i >= 0; i--) {
					swap(0, i);
					heapify(array, i, 0)
				}
			  }
			  
			function heapify(array, size, i) {
				let max = i
				let left = 2 * i + 1
				let right = 2 * i + 2
			  
				if (left < size && array[left] > array[max])
				  max = left
			  
				if (right < size && array[right] > array[max])
				  max = right
			  
				if (max != i) {
					swap(array, i, max);
				
					heapify(array, size, max)
				}
			}
			break;
		case 9:
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

async function changedAlgo(){
	localizeElem(`Algo-Info\\${selAlgo.options[selAlgo.selectedIndex].value}.json`, descBox);
	await sleep(200);
	Prism.highlightAll();
}

function test(text){
    console.log(text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'));
}