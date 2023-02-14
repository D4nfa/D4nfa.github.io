var isHidden = true;

function MinMaxNav()
{
    var btn = document.getElementById("navBtn");
    var div = document.getElementById("navDiv");
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