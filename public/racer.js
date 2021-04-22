// connect to socket.io server
const socket = io(); // connects to localhost

var racer1 = {
  buttonType: 1,
  left: 0,
};

var racer2 = {
  buttonType: 2,
  left: 0,
};

function sendMovement(event) {
  if (event.target.className === "player1Btn") {
    // const racer = document.querySelector(".racer.player1");
    // racer1.left++;
    // racer.style.left = racer1.left + "px";

    socket.emit("movement", { buttonType: 1 });
  } else {
    // const racer = document.querySelector(".racer.player2");
    // racer2.left++;
    // racer.style.left = racer2.left + "px";

    socket.emit("movement", { buttonType: 2 });
  }
}

function receiveMovement(data) {
  const { buttonType, left } = data;

  if (buttonType === 1) {
    const racer = document.querySelector(".racer.player1");
    racer1.left = left;
    racer.style.left = left + "px";
  } else {
    const racer = document.querySelector(".racer.player2");
    racer2.left = left;
    racer.style.left = left + "px";
  }
}

function main() {
  const btn1 = document.querySelector(".player1Btn");
  const btn2 = document.querySelector(".player2Btn");

  btn1.addEventListener("click", sendMovement);
  btn2.addEventListener("click", sendMovement);

  socket.on("movement", receiveMovement);
}

document.addEventListener("DOMContentLoaded", main);
