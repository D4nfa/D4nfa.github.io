var LangKeys;

function onLoad(){
	LangKeys = local;
	addEventListener('langChanged', () => {this.localizePage('local.json'); update();});
	loadLangElement();
	localizePage();
	update();

}

function localizePage(json){
	subKeysAtr(document.getElementsByTagName('html')[0], [LangKeys[lang], LangKeys['GENERAL']]);
}

var ipInputs = [
	document.getElementById("ip1"),
	document.getElementById("ip2"),
	document.getElementById("ip3"),
	document.getElementById("ip4")
]

var maskInputs = [
	document.getElementById("mask1"),
	document.getElementById("mask2"),
	document.getElementById("mask3"),
	document.getElementById("mask4"),
]

function DecBiIp(){
	let ipState = document.getElementById('BiDecIp').checked;
	
	//False = Decimal
	//True = Binary
	if(ipState){
		for(let ipInput of ipInputs){
			ipInput.value = parseInt(ipInput.value).toString(2);
		}
	}else{
		for(let ipInput of ipInputs){
			ipInput.value = parseInt(ipInput.value, 2);
		}
	}
	
}

function DecBiMask(){
	let maskState = document.getElementById('BiDecMsk').checked;
	
	//False = Decimal
	//True = Binary
	if(maskState){
		for(let maskInput of maskInputs){
			maskInput.value = parseInt(maskInput.value).toString(2);
		}
	}else{
		for(let maskInput of maskInputs){
			maskInput.value = parseInt(maskInput.value, 2);
		}
	}
}

var output = document.getElementById("output");

function update(){
	//IP Input Constraints
	for(let ipInput of ipInputs){
		for(let i = 0; i < ipInput.value.length; i++){
			if(document.getElementById('BiDecIp').checked){
				if(ipInput.value[i] < 0 || ipInput.value[i] > 1){
					ipInput.value = ipInput.value.slice(0, i) + ipInput.value.slice(i + 1);
				}

			}else{
				if(ipInput.value[i] < 0 || ipInput.value[i] > 9){
					ipInput.value = ipInput.value.slice(0, i) + ipInput.value.slice(i + 1);
				}
			}
		}

		if(document.getElementById('BiDecIp').checked){
			if(parseInt(ipInput.value.toString(), 2) > 255){
				ipInput.value = (255).toString(2);
			}
		}else{
			if(parseInt(ipInput.value) > 255){
				ipInput.value = 255;
			}
		}
	}
	
	for(let maskInput of maskInputs){
		for(let i = 0; i < maskInput.value.length; i++){
			if(document.getElementById('BiDecMsk').checked){
				if(maskInput.value[i] < 0 || maskInput.value[i] > 1){
					maskInput.value = maskInput.value.slice(0, i) + maskInput.value.slice(i + 1);
				}

			}else{
				if(maskInput.value[i] < 0 || maskInput.value[i] > 9){
					maskInput.value = maskInput.value.slice(0, i) + maskInput.value.slice(i + 1);
				}
			}
		}

		if(document.getElementById('BiDecMsk').checked){
			if(parseInt(maskInput.value.toString(), 2) > 255){
				maskInput.value = (255).toString(2);
			}
		}else{
			if(parseInt(maskInput.value) > 255){
				maskInput.value = 255;
			}
		}
	}

	let ipVars = [
		parseInt(ipInputs[0].value),
		parseInt(ipInputs[1].value),
		parseInt(ipInputs[2].value),
		parseInt(ipInputs[3].value)
	]

	let maskVars = [
		parseInt(maskInputs[0].value),
		parseInt(maskInputs[1].value),
		parseInt(maskInputs[2].value),
		parseInt(maskInputs[3].value)
	]

	//Converting from binary to decimal
	if(document.getElementById('BiDecIp').checked){
		for(let i = 0; i < ipVars.length; i++){
			ipVars[i] = parseInt(ipVars[i].toString(), 2);
		}
	}

	if(document.getElementById('BiDecMsk').checked){
		for(let i = 0; i < maskVars.length; i++){
			maskVars[i] = parseInt(maskVars[i].toString(), 2);
		}
	}


	let isValidIp = false;
	let isValidMask = false;
	let runCheck = true;
	let runMaskCheck = true;

	//Check if values are valid
	for(let i = 1; i <= 4; i++){
		if((ipVars[i] > 255 || ipVars[i] < 0)){
			runCheck = false;
			runMaskCheck = false;
			break;
		}
		
		if(maskVars[i] > 255 || maskVars[i] < 0){
			runMaskCheck = false;
		}
	}
	
	let classRule;

	
	if(runCheck){
		classRule = classRules.find(o => ipVars[0] >= o.range[0] && ipVars[0] <= o.range[1])
		isValidIp = classRule != undefined;
	}

	if(runMaskCheck && isValidIp){
		let validMask = true;
		let configPoint = -1;


		for(let field = maskVars.length - 1; field >= 0; field--){
			if(configPoint == -1 && maskVars[field] != 0){
				configPoint = field;
			}
			if(configPoint != -1 && field != configPoint && maskVars[field] != 255){
				validMask = false;
			}
		}

		if(validMask){
			validMask = validMasks.includes(maskVars[configPoint]);
		}

		isValidMask = validMask;
	}
	
	output.innerText = subKeys(
	(isPrivateIp(ipVars) ? '{PRIVATEIP}' : '{PUBLICIP}')
	+ '\n' + (isValidIp ? '{VALIDIP}': '{NONVALIDIP}') 
	+ '\n{CLASS} ' + (classRule != null ? classRule.class : '?') 
	+ '\n' + (isValidMask ? '{VALIDMASK}' : '{NONVALIDMASK}') 
	+ '\n' + (isValidMask ? '{AVAILABLEHOSTS}: ' + availableHosts(maskVars) : '?'), [LangKeys[lang]]);
}

function isPrivateIp(ipVars){
	let privateRange = privateIps.find(o => ipVars[0] >= o.start[0] && ipVars[0] <= o.end[0])

	if(privateRange){
		for(let i = 0; i < ipVars.length; i++){
			if(ipVars[i] < privateRange.start[i] || ipVars[i] > privateRange.end[i]){
				return false;
			}
		}
	}
	return true;
}

function availableHosts(maskVars){
	let result = 1;
	for(let i = 1; i < maskVars.length; i++){
		result *= 256 - maskVars[i];
	}

	return result - 2;
}

const classRules = [
	{
		class: "A",
		range: [1, 126],
		mask: [1]
	},
	{
		class: "B",
		range: [128, 191],
		mask: [1,1]
	},
	{
		class: "C",
		range: [192, 223],
		mask: [1,1,1]
	},
	{
		class: "D",
		range: [224, 239],
		mask: []
	},
	{
		class: "E",
		range: [240, 254],
		mask: []
	}
];

const validMasks = [
	0,
	128,
	192,
	224,
	240,
	248,
	252,
	254,
	255
];

const privateIps = [
	{
		start: [10, 0, 0, 0],
		end: [10, 255, 255, 255]
	},
	{
		start: [127, 0, 0, 0],
		end: [127, 0, 0, 0]
	},
	{
		start: [172, 16, 0, 0],
		end: [172, 31, 255, 255]
	},
	{
		start: [192, 168, 0, 0],
		end: [192, 168, 255, 255]
	},
	{
		start: [224, 0, 0, 0],
		end: [239, 255, 255, 255]
	}
]