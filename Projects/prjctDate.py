import os
clear = lambda: os.system('cls')

import json;
from pathlib import Path
from datetime import datetime

with open(Path(__file__).with_name('projects.json'), 'r') as openfile:
    json_object = json.load(openfile);

while True:
    clear()
    print('-1 to save file')
    i = 0;
    for x in json_object:
        print(i, x);
        i += 1;


    prjct = int(input('which project do you want to update?\n'))
    if(prjct == -1):
        with open(Path(__file__).with_name('projects.json'), 'w') as outfile:
            json.dump(json_object, outfile)
        
        break;
    else:
        userInput = input('are you sure you want to update ' + json_object[prjct]['link'] + '? y,n: ')
        if(userInput == 'y'):
            json_object[prjct]['lastUpdated'] = datetime.timestamp(datetime.now())