var canvas = document.getElementById('canvasCuerda')
var output = document.getElementById('output')
var ctx = canvas.getContext('2d')
var size = 2000
var sizeRope = 1500
var mousePos

//Function initial
function load() {
    console.log("entry")
    ctx.lineWidth = 5 //thickness rope
    draw(size / 2, 0, size / 2, size)
}

function draw(mX, mY, lX, lY) {
    ctx.beginPath()
    ctx.strokeStyle = "#955F53"
    ctx.moveTo(mX, mY)
    ctx.lineTo(lX, lY)
    ctx.stroke()
}

//event move mouse
canvas.addEventListener("mousemove", function (evt) {
    mousePos = posMouseF(canvas, evt)
    //showCoor(output, mousePos.x, mousePos.y)
    reDraw()
}, false)

//get coordinates of mouse in X and Y 
function posMouseF(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect()
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

//show coordinates in html (close to mouse)
function showCoor(output, x, y) {
    output.innerHTML = ("x: " + x + ", y: " + y)
    output.style.top = (y + 10) + "px"
    output.style.left = (x + 10) + "px"
    output.style.backgroundColor = "#FFF"
    output.style.border = "1px solid #d9d9d9"
    canvas.style.cursor = "pointer"
}

function reDraw() {
    resetCanvas()//clean canvas
    draw(size / 2, 0,mousePos.x, mousePos.y)
    let xF = getHypotenuse()
    draw(mousePos.x, mousePos.y, mousePos.x, xF + mousePos.y )
}

function resetCanvas() {
    ctx.clearRect(0, 0, size, size)
}

function getHypotenuse(){
    let a = mousePos.x - size / 2
    let b = mousePos.y
    let h = Math.sqrt((b * b) + (a * a))
    let x = sizeRope - h
    return x
}


canvas.addEventListener("click", function () {
    reDraw()
    console.log("Dio click")
}, false)
