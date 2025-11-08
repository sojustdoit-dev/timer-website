let pipWindow = false;

const sliderInput = document.querySelector(".slider-box input")
const btnPip = document.querySelector("#btnPip");



btnPip.addEventListener("click", () => {
  if (!pipWindow) {
    btnPip.value = "Leave Picture in Picture";
    enterPiP();
  } else {
    btnPip.value = "Enter Picture in Picture";
    pipWindow.close();
    onLeavePiP.call(pipWindow);
    
    
  }
})

sliderInput.addEventListener("input", () => {
  pipWindow.document.body.style.opacity = sliderInput.value / 100;
  document.querySelector(".slider-box span").innerHTML = sliderInput.value;
});

async function enterPiP() {
  const player = document.querySelector("#player");
  const playerContainer = document.querySelector("#player-container");

  const pipOptions = {
    width: 100,
    height: 120
  };

  pipWindow = await documentPictureInPicture.requestWindow();
  console.log(pipWindow);

  //Inject CSS and Open PiP
  const style = document.createElement("style");
  style.textContent = `
    body {
      background: rgba(0, 0, 0, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      height: 100vh;
      overflow: hidden;
      border: none;
      opacity: 1;
      
    }
    #player {
      font-size: 52px;
      color: white;
      font-weight: 800;
      color: white;
    }
  `;
  pipWindow.document.head.append(style);
  pipWindow.document.body.append(player);

  // Listen for the PiP closing event to put the video back.
  pipWindow.addEventListener("pagehide", onLeavePiP.bind(pipWindow), {
    once: true,
  });



}

function onLeavePiP() {
  if (this !== pipWindow) {
    return;
  }

  btnPip.value = "Enter Picture in Picture";
  // Remove PiP styling from the container.
  const playerContainer = document.querySelector("#player-container");
  playerContainer.classList.remove("pip-mode");

  // Add the player back to the main window.
  const pipPlayer = pipWindow.document.querySelector("#player");
  playerContainer.append(pipPlayer);
  pipWindow = false;


}