var isHidden = true;
var project = fetch('./Projects/ImageCollage/info.json');

console.log(project);
//console.log(subKey(projectTemplate, ));

function MinMaxNav()
{
    var btn = $("navBtn");
    var div = $("navDiv");
    switch (isHidden) {
        case true:
            btn.classList.remove("navHidden");
            div.classList.remove("hidden");
            break;

        case false:
            btn.classList.add("navHidden");
            div.classList.add("hidden");
            break;
    }
    isHidden = !isHidden;
}