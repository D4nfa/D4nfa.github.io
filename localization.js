//Function that substitues keys in a text with key value pairs
//Expects keys to be in an array to allow for use of multiple keysets
function subKeys(template, keys) {
    for(let keyset of keys){
        for (let key of Object.keys(keyset)) {
            template = template.replaceAll(`{${key}}`, keyset[key]);
        }
    }
    
    return template;
}