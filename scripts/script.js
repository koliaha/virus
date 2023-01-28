let fx = null;
let sx = null;
let tx = null;
// let startFalling = true;
let startFalling = false;
let floor = 380;
const interFirst = setInterval(function (el) {
  if (parseInt($("#firstvirus").css("top"), 10) < (floor + 250) && startFalling) {
    $("#firstvirus").css({ top: "+=1" });
  } else {
    clearInterval(el);
  }
  fx = parseInt($("#firstvirus").css("top"), 10);
}, 5);
const interSecond = setInterval(function (el) {
  if (parseInt($("#secondvirus").css("top"), 10) < (floor + 250) && startFalling) {
    $("#secondvirus").css({ top: "+=1" });
  } else {
    clearInterval(el);
  }
  sx = parseInt($("#secondvirus").css("top"), 10);
}, 12);
const interThird = setInterval(function (el) {
  if (parseInt($("#thirdvirus").css("top"), 10) < (floor + 250) && startFalling) {
    $("#thirdvirus").css({ top: "+=1" });
  } else {
    clearInterval(el);
  }
  tx = parseInt($("#thirdvirus").css("top"), 10);
}, 8);

function closeVirus(id) {
  const elem = document.querySelector(`.${id}`);
  const openElem = elem.querySelector(".open");
  const closeElem = elem.querySelector(".close");
  openElem.classList.add("elemvirusclose");
  closeElem.classList.add("elemvirusopen");
  if (id == "first") clearInterval(interFirst);
  if (id == "second") clearInterval(interSecond);
  if (id == "third") clearInterval(interThird);
  const gotop = setInterval(function (el) {
    $(`#${id}virus`).css({ top: "-=1" });
  }, 90);
  setTimeout(() => {
    clearInterval(gotop);
    elem.style.opacity = "0";
  }, 500);
}

var piece1 = document.querySelector("#draggable");
if (piece1) {
  piece1.onmousedown = function (event) {
$(".arrow")[0].style.visibility = "hidden";
    $(".arrow")[1].style.visibility = "hidden";
    // calculate shift of drag point
    let shiftX = event.clientX - piece1.getBoundingClientRect().left;
    // prepare to drag object
    piece1.style.zIndex = 1000;
    // set object under cursor
    moveAt(event.pageX);
    // move object on half width and half height for centering
    function moveAt(pageX) {
      piece1.style.left = pageX - shiftX + "px";
    }
    function onMouseMove(event) {
      moveAt(event.pageX);
      if (event.pageX > 64 && event.pageX < 98 && fx > floor) {
        closeVirus("first");
      }
      if (event.pageX > 148 && event.pageX < 171 && sx > floor) {
        closeVirus("second");
      }
      if (event.pageX > 204 && event.pageX < 245 && tx > floor) {
        closeVirus("third");
      }
    }
    //   // drag on the screen by mouse
    document.addEventListener("mousemove", onMouseMove);
    // drop object and remove event listeners
    piece1.onmouseup = function () {
      // checkPlaces();
setTimeout(() => {
        $(".arrow")[0].style.visibility = "visible";
        $(".arrow")[1].style.visibility = "visible";
      }, 500);

      document.removeEventListener("mousemove", onMouseMove);
      piece1.onmouseup = null;
    };
    //   console.log($(piece1).position());
  };
  piece1.ondragstart = function () {
    return false;
  };
}

function showSecond() {
  $("#firstsec")[0].style.visibility = "hidden";
  $("#secondsec")[0].style.visibility = "visible";
setTimeout(() => {
    startFalling = true;
  }, 300);
  setTimeout(() => {
    showThird();
$("#draggable")[0].style.display = "none";
  }, 4500);
}
function showThird() {
$(".arrow")[0].style.visibility = "hidden";
    $(".arrow")[1].style.visibility = "hidden";
  startFalling = false;
  $("#secondsec")[0].style.visibility = "hidden";
  $("#thirdsec")[0].style.visibility = "visible";
  setTimeout(() => {
    showForth();
  }, 2000);
}
function showForth() {
  $("#thirdsec")[0].style.visibility = "hidden";
  $("#forthsec")[0].style.visibility = "visible";
}
$("#beginClick").click(function () {
  showSecond();
});
