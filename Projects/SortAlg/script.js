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
		let pillarHeight = (list[x - index] - minMax[0]) / (minMax[1] - minMax[0]) * rect.height;
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
	Quick: 6,
	Radix: 7,
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
					}
					
					drawList(arr, minMax);
					await sleep(1);
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
				}
				drawList(arr, minMax);
				await sleep(1);
			}
			break;
		case 3:
			//Bitonic sort
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
			//Merge sort
			drawList(arr, minMax);
			

			arr = await mergeSort(arr, 0);
			async function mergeSort(arra, index) {
				
				const half = arra.length / 2
			  
				if (arra.length < 2){
				  return arra;
				}

				
			  
				const left = arra.splice(0, half);
				let e = await merge(await mergeSort(left, index), await mergeSort(arra, index + half), index);
				drawRecursive(e, n, index, minMax);
				await sleep(1);

				return e;
			}

			async function merge(left, right, index) {
				let arr1 = []
			
				while (left.length && right.length) {
					if (left[0] < right[0]) {
						arr1.push(left.shift())
					} else {
						arr1.push(right.shift())
					}
					drawRecursive(arr1, n, index, minMax);
					await sleep(1)
				}
				return [ ...arr1, ...left, ...right ]
			}
			break;
		case 5:
			//heap sort
			drawList(arr, minMax);
			
			await heapSort(arr);
			async function heapSort(array) {
				let size = array.length

				for (let i = Math.floor(size / 2 - 1); i >= 0; i--){
					await heapify(array, size, i)
				}
				for (let i = size - 1; i >= 0; i--) {
					swap(array, 0, i);
					await heapify(array, i, 0)
				}
			}
			  
			async function heapify(array, size, i) {
				let max = i
				let left = 2 * i + 1
				let right = 2 * i + 2

				if (left < size && array[left] > array[max])
					max = left

				if (right < size && array[right] > array[max])
					max = right

				if (max != i) {
					swap(array, i, max);
					await heapify(array, size, max)
					
					drawList(arr, minMax);
					await sleep(1);
				}
			}
			drawList(arr, minMax);
			break;
		case 6:
			//quick sort
			arr = await quickSort(arr);
			async function quickSort(array, start, end) {
				if (start === undefined) {
				  start = 0;
				  end = array.length - 1;
				} else if (start >= end) {
				  return array;
				}
				var rStart = start, rEnd = end;
				var pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];
				while (start < end) {
				  while (array[start] <= pivot) start++;
				  while (array[end] > pivot) end--;
				  if (start < end) {
					swap(array, start, end);

					
					drawList(array, minMax);
					await sleep(1);
				  }
				}
				quickSort(array, rStart, start - 1);
				quickSort(array, start, rEnd);
				drawList(array, minMax);
				await sleep(1);
			  }
			break;
		case 7:
			//Radix sort
			drawList(arr, minMax);

			arr = await radixSort(arr); 
			
			function getMax(arr1) {
				let max = 0;
				for (let num of arr1) {
					if (max < num.toString().length) {
						max = num.toString().length
					}
				}
				return max
			}
			
			function getPosition(num, place){
				return  Math.floor(Math.abs(num)/Math.pow(10,place))% 10
			}
			
			async function radixSort(arr1) {
				const max = getMax(arr1);
			
				for (let i = 0; i < max; i++) {
					let buckets = Array.from({ length: 10 }, () => [ ])
					for (let j = 0; j < arr1.length; j++) {
					  	buckets[getPosition(arr1[ j ], i)].push(arr1[ j ]);
					  	var index = 0;
						for(let j = 0; j < buckets.length; j++){
							drawRecursive(buckets[j], n, index, minMax);
							index += buckets[j].length;
							
						}
						await sleep(1);
					}
					
					arr1 = [ ].concat(...buckets);
				}
				return arr1
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