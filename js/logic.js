var canvas = document.getElementById('canvasCuerda')
var ctx = canvas.getContext('2d')
var size = 1000

var domRect = element.getBoundingClientRect();


function load(){
    console.log("entry")
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.strokeStyle = "#f00"
    ctx.moveTo(size/2, 0)
    ctx.lineTo(size/2, size)
    ctx.stroke()
    //console.log(positionMouse())
    console.log(domRect)
}

function oMousePos(canvas,evt){
    console.log("Entry in mouse")
    var ClientRect = canvas.getBoundingClientRect();
	return { //objeto
	x: Math.round(evt.clientX - ClientRect.left),
	y: Math.round(evt.clientY - ClientRect.top)
    }
}