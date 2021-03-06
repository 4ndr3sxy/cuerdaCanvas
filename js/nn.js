var canvas = document.getElementById("lienzo");
if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    if (ctx) {
        var output = document.getElementById("output");

        canvas.addEventListener("mousemove", function (evt) {
            var mousePos = oMousePos(canvas, evt);
            marcarCoords(output, mousePos.x, mousePos.y)
        }, false);
/*
        canvas.addEventListener("mouseout", function (evt) {
            limpiarCoords(output);
        }, false);
*/
    }
}

function marcarCoords(output, x, y) {
    output.innerHTML = ("x: " + x + ", y: " + y);
    output.style.top = (y + 10) + "px";
    output.style.left = (x + 10) + "px";
    output.style.backgroundColor = "#FFF";
    output.style.border = "1px solid #d9d9d9"
    canvas.style.cursor = "pointer";
}

function limpiarCoords(output) {
    output.innerHTML = "";
    output.style.top = 0 + "px";
    output.style.left = 0 + "px";
    output.style.backgroundColor = "transparent"
    output.style.border = "none";
    canvas.style.cursor = "default";
}

function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

console.log("helloDA")