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
    draw(size / 2, 0, size / 2, sizeRope)
}

//draw in canvas
function draw(mX, mY, lX, lY) {
    ctx.beginPath()
    ctx.strokeStyle = "#955F53"
    ctx.moveTo(mX, mY)
    ctx.lineTo(lX, lY)
    ctx.stroke()
}

var xTmp, yTmp
//event move mouse
canvas.addEventListener("mousemove", function (evt) {
    //showCoor(output, mousePos.x, mousePos.y)
    mousePos = posMouseF(canvas, evt)
    
    if(validateLimitCoor){
        console.log("validate entry")
        xTmp = mousePos.x
        yTmp = mousePos.y
        drawParabolic()
        //setTimeout(test123,10)
    }else{
        reDraw()
    }
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

//draw in canvas with adjustment in rope shape 
function reDraw() {
    resetCanvas()
    draw(size / 2, 0,mousePos.x, mousePos.y) //firts part of the rope
    let xF = getHypotenuse()
    if(xF >= 0)
        draw(mousePos.x, mousePos.y, mousePos.x, xF + mousePos.y )//second part of the rope
}

//clean canvas
function resetCanvas() {
    ctx.clearRect(0, 0, size, size)
}

var validateLimitCoor =false
//get difference missing of rope length (according of triangule of Pythagoras)
function getHypotenuse(){
    let a = mousePos.x - size / 2 //position end of rope less position initial of rope (get side 'A' of triangule)
    let b = mousePos.y // get side 'B' of triangule
    let h = Math.sqrt((b * b) + (a * a)) //hypotenuse with Pythagoras equation
    let x = sizeRope - h //subtract hypotenuse of the rope size initial
    if(x < 0)
        validateLimitCoor = true
    else{
        validateLimitCoor = false
    }
    return x
}


canvas.addEventListener("click", function () {
    reDraw()
    console.log("Dio click"+ mousePos.x + " - "+mousePos.y)
}, false)

var tmpCoor = 1
var timer
function drawParabolic(){
    if(xTmp > 1000){
        parabolicRightLeft()
    }else{
        parabolicLeftRight()
    }
}

function parabolicLeftRight(){
    resetCanvas()
    draw(size / 2, 0,xTmp, yTmp)
    if(tmpP < 1000){
        timer = setTimeout(parabolicRightLeft,100)
    }else{
         clearTimeout(timer)
         tmpP = 0
    }
}

var valYTmp = false
var dParabolicX = 0
var tmpP = 0
function parabolicRightLeft(){
    resetCanvas()
    draw(size / 2, 0,xTmp, yTmp)
    xTmp--
    if(yTmp<=1500 && !valYTmp){
        if(xTmp % 5 == 0){
            yTmp++
        }
    }else{
        if(xTmp % 5 == 0){
            yTmp-- 
        }
        valYTmp = true
    }
    if(tmpP < 1000){
        timer = setTimeout(parabolicRightLeft,100)
    }else{
         clearTimeout(timer)
    }
    tmpP++
}

function diferentParabolicX(){

}