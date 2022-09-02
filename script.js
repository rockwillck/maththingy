canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 1024

numPoints = prompt("# Points:")
dots = []
dotsSub = []
for (x=0; x<numPoints; x++) {
  dotsSub.push([Math.random()*canvas.width, Math.random()*canvas.height])
}
dots.push(dotsSub)

alert("Right arrow to go to next iteration, left arrow to go backwards. May take a few minutes after iteration 3 if number of points greater than 3.")

var progressValue = 0
function chooseTwo(list) {
  allPairs = []
  for (x=0; x<list.length; x++) {
    for (y=x+1; y<list.length; y++){
      allPairs.push([list[x], list[y]])
    }
  }
  
  return allPairs
}

let dotsProspective = []
let current = 0

window.addEventListener("keydown", function (e){
  valid = false
  if (e.key == "ArrowRight") {
    valid = true
    if (current <= dots.length - 1) {
      chooseTwo(dots[dots.length - 1]).forEach((pair) => {
        dotsProspective.push([(pair[0][0] + pair[1][0])/2, (pair[0][1] + pair[1][1])/2])
    }) 
      dots.push(dotsProspective)
      dotsProspective = []
      
      current += 1
    }
  }
  if (e.key == "ArrowLeft") {
    if (current > 0) {
      valid = true
      current -= 1
    }
  }
  
  if (valid) {
    ctx.fillStyle = "rgb(200, 200, 200)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    for (i=0;i<=current;i++) {
      ctx.fillStyle = `rgba(${i/current*255}, 0, ${(current - i)/current*255}, 0.2)`
      ctx.beginPath()
      ctx.moveTo(dots[i][0][0], dots[i][0][1])
      dots[i].forEach((dot) => {
        ctx.lineTo(dot[0], dot[1])
        ctx.arc(dot[0], dot[1], 10, 0, 2*Math.PI)
      })
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
    }
    document.getElementById("iter").innerText = "Iteration: " + current
  }
})

ctx.fillStyle = "rgb(200, 200, 200)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  ctx.fillStyle = "rgba(0, 0, 255, 0.2)"
  ctx.beginPath()
  ctx.moveTo(dots[0][0][0], dots[0][0][1])
  dots[current].forEach((dot) => {
    ctx.lineTo(dot[0], dot[1])
    ctx.arc(dot[0], dot[1], 10, 0, 2*Math.PI)
  })
  ctx.closePath()
  ctx.stroke()
  ctx.fill()