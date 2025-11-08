const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const edit = document.getElementById("edit");
const timer = document.getElementById("timer");
const showSeconds = document.querySelector(".slider-box button")
const sliderInput = document.querySelector(".slider-box input")

let timeLeft = parseInt(localStorage.getItem("timeLeft")) || 2100;
let interval;
let showSecond = true;

sliderInput.addEventListener("input", () => {
  document.querySelector(".container").style.opacity = sliderInput.value / 100;
  document.querySelector(".slider-box span").innerHTML = sliderInput.value;
});





updateTimer();

function showSecondBtn() {
  if (showSecond) {
    showSecond = false;
    showSeconds.innerHTML = "Show Seconds"
    updateTimer();
  } else {
    showSecond = true;
    showSeconds.innerHTML = "Don't show Seconds"
    updateTimer();
  }
  
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  if (showSecond) {
   timer.innerHTML =
    `${minutes.toString().padStart(2, "0")}
    :
    ${seconds.toString().padStart(2, "0")}`; 

    document.title = 
      `${minutes.toString().padStart(2, "0")}
      :
      ${seconds.toString().padStart(2, "0")}`; 
  } else {
    timer.innerHTML =
      `${minutes.toString().padStart(2, "0")}
      :
      )`;  
    
    document.title = 
      `${minutes.toString().padStart(2, "0")}
      :
      )`; 
  }
};

const startTimer = () => {
  start.disabled = true;
  // quick 1 second down for visual
  // timeLeft--;
  updateTimer();

  interval = setInterval(() => {
    timeLeft = timeLeft - 1;
    updateTimer();

    if(timeLeft === 0) {
      clearInterval(interval);
      alert("Time's up!");
      timeLeft = parseInt(localStorage.getItem("timeLeft")) || 1500;
      updateTimer()
      start.disabled = false;
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(interval);
  start.disabled = false;
};

const resetTimer = () => {
  clearInterval(interval);
  timeLeft = parseInt(localStorage.getItem("timeLeft")) || 1500;
  updateTimer();
  start.disabled = false;
};


start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
edit.addEventListener("click", () => {
  stopTimer();
  window.location.href = "edit.html"
});

showSeconds.addEventListener("click", () => {
  showSecondBtn();
  
});





