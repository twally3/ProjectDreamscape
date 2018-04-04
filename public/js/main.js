import Timer from "./Timer.js";

(async function main(canvas) {
  const context = canvas.getContext('2d');

  const img = await loadImage('/img/larry.jpg')

  const imgWidthGTHeight = img.width > img.height;

  const newWidth = imgWidthGTHeight ? canvas.width : (img.width * canvas.height) / img.height;
  const newHeight = imgWidthGTHeight ? (img.height * canvas.width) / img.width : canvas.height;
  const newX = (canvas.width - newWidth) / 2;
  const newY = (canvas.height - newHeight) / 2;

  const path = [];
  let isDrawing = false;

  canvas.addEventListener('mousedown', _ => {
    console.log('start drawing');
    isDrawing = true;
    path.push({
      path: []
    })
  })

  canvas.addEventListener('mouseup', _ => {
    console.log('stop drawing');
    isDrawing = false;
    if (path[path.length - 1].path.length === 0) {
      console.log('Nope')
      path.pop();
    }
  })

  canvas.addEventListener('mousemove', e => {
    if (isDrawing) {
      const canvasWidthScaled = canvas.width * window.innerHeight / canvas.height;
      const xScreen = e.clientX - (window.innerWidth - canvasWidthScaled) / 2

      const xMapped = ((xScreen - 0) / (canvasWidthScaled - 0)) * (720 - 0) + 0
      const yMapped = ((e.clientY - 0) / (window.innerHeight - 0)) * (720 - 0) + 0

      // path.push({ x: xMapped, y: yMapped });
      path[path.length - 1].path.push({ x: xMapped, y: yMapped })
    }
  })

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, newX, newY, newWidth, newHeight);

    context.beginPath()
    context.fillStyle = '#000'

    path.forEach((obj, i) => {
      obj.path.forEach(({x, y}, i) => {
        if (i == 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y)
        }
      })
    })

    context.stroke();
    context.closePath()

    debugOutline(context, canvas);
  }
  timer.start();

})(document.getElementById('screen'));

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', _ => {
      resolve(image);
    });
    image.src = url;
  })
}

// Outline for debugging
function debugOutline(context, canvas) {
  context.beginPath()
  context.strokeStyle = '#000';
  context.rect(0, 0, canvas.width, canvas.height);
  context.stroke();
  context.closePath();
}