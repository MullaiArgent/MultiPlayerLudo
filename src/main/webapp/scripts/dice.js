function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function roll(dotParam) {
  const dots = document.getElementsByClassName(dotParam);

  const dotConfig = getRndInteger(1, 7);
  let dotBackground;
  if (dotConfig === 1) {
    dotBackground = [0, 0, 0, 0, 1, 0, 0, 0, 0];
  } else if (dotConfig === 2) {
    dotBackground = [1, 0, 0, 0, 0, 0, 0, 0, 1];
  } else if (dotConfig === 3) {
    dotBackground = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  } else if (dotConfig === 4) {
    dotBackground = [1, 0, 1, 0, 0, 0, 1, 0, 1];
  } else if (dotConfig === 5) {
    dotBackground = [1, 0, 1, 0, 1, 0, 1, 0, 1];
  } else if (dotConfig === 6) {
    dotBackground = [1, 0, 1, 1, 0, 1, 1, 0, 1];
  }
  for (let i = 0; i < dots.length; i++) {
    if (dotBackground[i] === 0) {
      dots[i].style.background = "black";
    }
    else{
      console.log("white");
      dots[i].style.background = "white";
    }
  }
}