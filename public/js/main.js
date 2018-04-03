import Timer from "./Timer.js";

(async function main(canvas) {
  const context = canvas.getContext('2d');

  const img = await loadImage('/img/larry.jpg')

  const imgWidthGTHeight = img.width > img.height;
  
  const newWidth = imgWidthGTHeight ? canvas.width : (img.width * canvas.height) / img.height;
  const newHeight = imgWidthGTHeight ? (img.height * canvas.width) / img.width : canvas.height;
  const newX = (canvas.width - newWidth) / 2;
  const newY = (canvas.height - newHeight) / 2;
  
  const rect = {
    x: 100,
    y: 300
  }

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, newX, newY, newWidth, newHeight);
    
    // Outline for debugging
    context.beginPath()
    context.strokeStyle = '#000';
    context.rect(0, 0, canvas.width, canvas.height);
    context.stroke();
    context.closePath();


    context.beginPath()
    context.fillStyle = '#fff'
    context.rect(rect.x, rect.y, 150, 100);
    context.stroke();
    context.closePath();

    // rect.x += 1 * deltaTime * 20
    // rect.y += 1 * deltaTime * 20
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