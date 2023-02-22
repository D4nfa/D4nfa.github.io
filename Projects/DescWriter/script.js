this.markdownInput;
this.parsedOutput;
this.rawInput;

function load()
{
    this.markdownInput = document.getElementById('markdownInput');
    this.parsedOutput = document.getElementById('parsedOut');
    this.rawInput = document.getElementById('rawInput');
}

function updateFields(caller, content)
{
    if(caller != 'markdown'){
        markdownInput.value = content.replaceAll('<br>', '\n<br>');
    }

    if(caller != 'raw'){
        rawInput.value = content;
    }

    parsedOut.innerHTML = content;
}