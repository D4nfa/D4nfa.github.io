function subKeys(template, keys) {
    for (let key of Object.keys(keys)) {
        template = template.replaceAll('{${keys}}', keys[key]);
    }
    return template;
}