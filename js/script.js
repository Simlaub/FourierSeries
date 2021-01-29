const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const xOffset = canvas.width/5;
const yOffset = canvas.height/2;

let nInput = document.getElementById("nInput");
let squareWaveInput = document.getElementById("squareWave");
let sawtoothWaveInput = document.getElementById("sawtoothWave");
let waveType = "squareWave";

let dAngle = -0.02;
let angle = 0;
let graphPoints = [];
let n = nInput.value;



ctx.translate(xOffset, yOffset);
ctx.lineWidth = 2;



function draw() {
  ctx.clearRect(-xOffset, -yOffset, canvas.width, canvas.height);

  let x = 0;
  let y = 0;
  let radius = 0;

  for (var i = 0; i < n; i++) {
    let prevX = x;
    let prevY = y;
    let k;

    switch (waveType) {
      case "squareWave":
        k = i * 2 + 1;
        break;
      case "sawtoothWave":
        k = (i + 1) * 2;
        break;
      default:
        k = i * 2 + 1;
        break;
    }

    radius = 200 * (4 / (k * Math.PI));

    ctx.beginPath();
    ctx.arc(prevX, prevY, radius, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.closePath();

    x += radius * Math.cos(k * angle);
    y += radius * Math.sin(k * angle);

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI*2, true);
    ctx.fill();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

  }

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(xOffset, y);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.closePath();

  graphPoints.unshift(y);

  for (var i = 0; i < graphPoints.length; i++) {
    ctx.beginPath();
    ctx.moveTo(xOffset + i-1, graphPoints[i-1]);
    ctx.lineTo(xOffset + i, graphPoints[i]);
    ctx.stroke();
    ctx.closePath();

    if(i > canvas.width-xOffset*2) {
      graphPoints.pop();
    }
  }

  angle += dAngle;

  requestAnimationFrame(draw);
}

nInput.addEventListener("change", () => n = nInput.value);
squareWaveInput.addEventListener("click", () => waveType = "squareWave");
sawtoothWaveInput.addEventListener("click", () => waveType = "sawtoothWave");

draw();
