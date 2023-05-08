import os;
clear = lambda: os.system('cls');

import json;
from pathlib import Path;
from datetime import datetime;

with open(Path(__file__).with_name('projects.json'), 'r') as openfile:
	json_object = json.load(openfile);

while True:
	clear();
	print('-1 to save file');
	print('0 to update all projects');
	i = 1;
	for x in json_object:
		print(i, x);
		i += 1;


	prjct = int(input('which project do you want to update?\n'))
	if(prjct == -1):
		with open(Path(__file__).with_name('projects.json'), 'w') as outfile:
			json.dump(json_object, outfile);
		break;
	elif(prjct == 0):
		userInput = input('are you sure you want to update all projects? y,n: ');
		if(userInput == 'y'):
			for x in json_object:
				x['lastUpdated'] = datetime.timestamp(datetime.now());
	else:
		userInput = input('are you sure you want to update ' + json_object[prjct - 1]['link'] + '? y,n: ')
		if(userInput == 'y'):
			json_object[prjct - 1]['lastUpdated'] = datetime.timestamp(datetime.now());