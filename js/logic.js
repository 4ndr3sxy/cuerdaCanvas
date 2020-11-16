var canvas = document.getElementById('canvasCuerda')
var output = document.getElementById('output')
var ctx = canvas.getContext('2d')
var size = 1000
var mousePos

function load(){
    console.log("entry")
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.strokeStyle = "#f00"
    ctx.moveTo(size/2, 0)
    ctx.lineTo(size/2, size)
    ctx.stroke()
    //console.log(positionMouse())
}

canvas.addEventListener("mousemove", function (evt) {
    mousePos = posMouseF(canvas, evt)
    showCoor(output, mousePos.x, mousePos.y)
    reDraw()
}, false)

canvas.addEventListener("click",function(){
    reDraw()
    console.log("Dio click")
},false)

function posMouseF(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect()
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

function showCoor(output, x, y) {
    output.innerHTML = ("x: " + x + ", y: " + y)
    output.style.top = (y + 10) + "px"
    output.style.left = (x + 10) + "px"
    output.style.backgroundColor = "#FFF"
    output.style.border = "1px solid #d9d9d9"
    canvas.style.cursor = "pointer"
}

function reDraw(){
    console.log(mousePos.x, mousePos.y)
    ctx.clearRect(0, 0, size, size)
    ctx.lineWidth = 5

    ctx.beginPath()
    ctx.strokeStyle = "#f00"
    ctx.moveTo(size/2, 0)
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "#f00"
    ctx.moveTo(mousePos.x, mousePos.y)
    ctx.lineTo(mousePos.x, 1000)
    ctx.stroke()
}