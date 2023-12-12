
let images = [];
let texts = [];
let toDisplay = false;
const canvasSize = 800;
function setup() {
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("canvasHolder");
  background(0);


  let imageloader = document.getElementById("imageLoader");
  imageLoader.addEventListener("change", handleImage, false);

  let collageButton = document.getElementById("createCollage");
  collageButton.addEventListener("click", () => {
    toDisplay = true;
  });

  let textOption = document.getElementById("textOption");
  textOption.addEventListener("pressEnter", function (e) {
    if (e.key === "Enter") {
      addTextToCanvas();
    }
  });
    let saveButton = document.getElementById('saveImage');
saveButton.addEventListener('click', saveImage);
}

function handleImage(e) {
  let fileList = e.target.files;

  for (let i = 0, f; (f = fileList[i]); i++) {
    if (!f.type.match("image")) {
      continue;
    }

    let reader = new FileReader();

    reader.onload = (function (theFile) {
      return function (e) {
        loadImage(e.target.result, (img) => {
          images.push(img);
        });
      };
    })(f);

    reader.readAsDataURL(f);
  }
}


function randomCropImage(img) {
  let maxCropSize = min(img.width, img.height) / 3;
  let cropSize = random(maxCropSize / 2, maxCropSize);
  let cropX = random(0, img.width - cropSize);
  let cropY = random(0, img.height - cropSize);
  return img.get(cropX, cropY, cropSize, cropSize);

}

function draw() {
  if (toDisplay) {
    background(255);
    images.forEach((img) => {
      let cropped = randomCropImage(img);
      let x = random(canvasSize - cropped.width);
      let y = random(canvasSize - cropped.height);
      image(cropped, x, y);
    });

    texts.forEach((txt) => {
      fill(0);
      textSize(24);
      text(txt.content, txt.x, txt.y);
    });

    toDisplay = false;
  }
}

function addTextToCanvas() {
  let textOption = document.getElementById("textOption");
  if (textOption.value) {
    let textData = {
      content: textOption.value,
      x: random(canvasSize),
      y: random(canvasSize),
    };
    texts.push(textData);

    toDisplay = true;
  }
}
  function saveImage() {

    let timestamp = new Date().getTime();
    let filename = `collage_${timestamp}.png`;

    saveCanvas(filename);


}
