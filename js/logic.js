var canvas = document.getElementById('canvasCuerda')
var output = document.getElementById('output')
var ctx = canvas.getContext('2d')
var size = 4000
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
    //resetCanvas()
    ctx.beginPath()
    ctx.strokeStyle = "#955F53"
    ctx.moveTo(mX, mY)
    ctx.lineTo(lX, lY)
    ctx.stroke()
    
    /*
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    */
}

var xTmp, yTmp
var valRgb = false
//event move mouse
canvas.addEventListener("mousemove", function (evt) {
    //showCoor(output, mousePos.x, mousePos.y)
    mousePos = posMouseF(canvas, evt)
    var rgb = !valRgb ? getaverageColor() : true
    if (rgb){
        if(validateLimitCoor){
            valRgb = false
            console.log("validate entry")
            xTmp = mousePos.x
            yTmp = mousePos.y
            //drawParabolic()
            
            drawParabolic()
            //setTimeout(drawParabolic,1)
        }else{
            reDraw()
        }
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
    let adjMousePosX = mousePos.x
    let adjMousePosY = mousePos.y
    adjMousePosX -= 2000
    console.log("Dio click"+ mousePos.x + " - "+mousePos.y)
    //console.log(Math.abs(getGrades(adjMousePosX,adjMousePosY) - 90))
    
    //reDraw()
}, false)

var tmpCoor = 1
var timer
var type = ""
var gradesRest = 0
function drawParabolic(){
    if(xTmp > size/2){
        type = "D"
        parabolicRightLeft()
    }else{
        type ="I"
        parabolicLeftRight()
    }
}

var valYTmp = false
var dParabolicX = 0
var tmpP = 0
var contRL = 0
var gradesCoor = 0
var valGrades = 0
var valParR = 0
function parabolicRightLeft(){
    console.log("**"+gradesRest+"**")
    resetCanvas()
    if(type == "D"){
        if(valGrades == 0){
            let adjMousePosX = mousePos.x
            let adjMousePosY = mousePos.y
            adjMousePosX -= 2000
            gradesCoor = getGrades(adjMousePosX,adjMousePosY)
            gradesRest =parseInt(((90 - gradesCoor) / 3)*2)
            console.log(gradesRest+"--")
            valGrades++
        }
        var ap = (Math.PI / 180) * parseInt(gradesCoor);
        var Xap = (size/2) + sizeRope * Math.cos(ap);
        var Yap = 0 + sizeRope * Math.sin(ap);
        draw(size / 2, 0,Xap, Yap)
        gradesCoor+=3
        console.log(gradesCoor+"**")
        
        
        if(gradesCoor > (gradesRest + 90)){
            //type="I"
            console.log("go to left-right")
            parabolicLeftRight()
        }else{
            setTimeout(parabolicRightLeft,1)
        }
    }else{
        if(valParR==0){
            //gradesRest =parseInt(((90 - gradesCoor) / 3)*2)
            gradesRest = parseInt((gradesRest/3)*2)
            //gradesRest = 
            valParR++
        }
        var ap = (Math.PI / 180) * parseInt(gradesCoor);
        var Xap = (size/2) + sizeRope * Math.cos(ap);
        var Yap = 0 + sizeRope * Math.sin(ap);
        draw(size / 2, 0,Xap, Yap)
        gradesCoor+=3
        if(gradesCoor > (gradesRest + 90)){
            valParR=0
            if(gradesRest == 0){
                resetCanvas()
                draw(size / 2, 0, size / 2, sizeRope)
                valRgb = false
                validateLimitCoor = false
                valGrades = 0
                //clearInterval(timerP)
                
            }else{
                parabolicLeftRight()
            }
        }else{
            setTimeout(parabolicRightLeft,1)
        }
    }
}

var valParL = 0
function parabolicLeftRight(){
    console.log("**"+gradesRest+"**")
    resetCanvas()
    if(type == "I"){
        if(valGrades == 0){
            let adjMousePosX = mousePos.x
            let adjMousePosY = mousePos.y
            adjMousePosX -= 2000
            gradesCoor = getGrades(adjMousePosX,adjMousePosY)
            gradesRest =Math.abs(parseInt(((90 - gradesCoor) / 3)*2))
            valGrades++
        }
        var ap = (Math.PI / 180) * parseInt(gradesCoor);
        var Xap = (size/2) + sizeRope * Math.cos(ap);
        var Yap = 0 + sizeRope * Math.sin(ap);
        draw(size / 2, 0,Xap, Yap)
        gradesCoor-=3
        if(gradesCoor < (90 - gradesRest)){
            //type="D"
            parabolicRightLeft()
        }else{
            setTimeout(parabolicLeftRight,1)
        }
    }else{
        if(valParL==0){
            //gradesRest =parseInt(((90 - gradesCoor) / 3)*2)
            gradesRest = parseInt((gradesRest/3)*2)
            //gradesRest = 
            valParL++
        }
        var ap = (Math.PI / 180) * parseInt(gradesCoor);
        var Xap = (size/2) + sizeRope * Math.cos(ap);
        var Yap = 0 + sizeRope * Math.sin(ap);
        draw(size / 2, 0,Xap, Yap)
        gradesCoor-=3
        if(gradesCoor < (90 - gradesRest)){
            valParL=0
            if(gradesRest == 0){
                resetCanvas()
                draw(size / 2, 0, size / 2, sizeRope)
                //clearInterval(timerP)
                valRgb = false
                validateLimitCoor = false
                valGrades = 0
            }else{
                parabolicRightLeft()
            }
        }else{
            setTimeout(parabolicLeftRight,1)
        }
    }
}

function diferentParabolicX(){

}

function getaverageColor() {
    let imageData, data, j 
    imageData = ctx.getImageData(mousePos.x, mousePos.y, mousePos.x, mousePos.y)
    data = imageData.data
    //console.log(data[0])
    if(data[0] == 149 || data[0] == 148){
        valRgb = true
        return true
    }
    return false
}   

function getGrades(x,y){
    let grades = Math.atan(x/y)
    grades = grades * 180 / Math.PI
    grades = Math.abs(grades -90)
    //console.log("**"+grades)
    return grades
}