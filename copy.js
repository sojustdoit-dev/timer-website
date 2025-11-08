// Handle to the picture-in-picture window.
let pipWindow = false;

async function enterPiP() {
  const player = document.querySelector("#player");
  
  
  

  const pipOptions = {
    width: 100,
    height: 120,
  };

  pipWindow = await documentPictureInPicture.requestWindow(pipOptions);

  // Inject CSS
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
      
    }
    #player {
      font-size: 52px;
      color: white;
      font-weight: 800;
      color: white;
    }
  `;
  pipWindow.document.head.append(style);

  // Style remaining container to imply the player is in PiP.
  const playerContainer = document.querySelector("#player-container");


  // Add player to the PiP window.
  pipWindow.document.body.append(player);

  // Listen for the PiP closing event to put the video back.
  pipWindow.addEventListener("pagehide", onLeavePiP.bind(pipWindow), {
    once: true,
  });
}

// Called when the PiP window has closed.
function onLeavePiP() {
  if (this !== pipWindow) {
    return;
  }

  // Remove PiP styling from the container.
  const playerContainer = document.querySelector("#player-container");
  playerContainer.classList.remove("pip-mode");
  

  // Add the player back to the main window.
  const pipPlayer = pipWindow.document.querySelector("#player");
  playerContainer.append(pipPlayer);
  pipWindow = false;
}