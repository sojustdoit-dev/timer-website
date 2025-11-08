const save = document.getElementById("save");
const cancel = document.getElementById("cancel");
const timer = document.getElementById("timer");

const min10up = document.getElementById("minup10");
const minup1 = document.getElementById("minup1");
const secup10 = document.getElementById("secup10");
const secup1 = document.getElementById("secup1");
const mindown10 = document.getElementById("mindown10");
const mindown1 = document.getElementById("mindown1");
const secdown10 = document.getElementById("secdown10");
const secdown1 = document.getElementById("secdown1");

const plus5 = document.getElementById("plus5");
const plus10 = document.getElementById("plus10");
const minus5 = document.getElementById("minus5");
const minus10 = document.getElementById("minus10");

const min5 = document.getElementById("min5");
const min10 = document.getElementById("min10");
const min15 = document.getElementById("min15");
const min20 = document.getElementById("min20");
const min25 = document.getElementById("min25");
const min30 = document.getElementById("min30");
const min45 = document.getElementById("min45");
const min60 = document.getElementById("min60");




let timeLeft = parseInt(localStorage.getItem("timeLeft")) || 1500;
updateTimer();

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timer.innerHTML =
    `${minutes.toString().padStart(2, "0")}
    :
    ${seconds.toString().padStart(2, "0")}`;

};


function changeTime(seconds) {
  timeLeft += seconds;
  timeLeft = timeLeft < 0 ? 0 : timeLeft;
  updateTimer()
  return timeLeft;
}

function changePresetTime(seconds) {
  timeLeft = seconds;
  updateTimer()
  return timeLeft;
}


min10up.addEventListener("click", () => changeTime(600));
minup1.addEventListener("click", () => changeTime(60));
secup10.addEventListener("click", () => changeTime(10));
secup1.addEventListener("click", () => changeTime(1));
mindown10.addEventListener("click", () => changeTime(-600));
mindown1.addEventListener("click", () => changeTime(-60));
secdown10.addEventListener("click", () => changeTime(-10));
secdown1.addEventListener("click", () => changeTime(-1));

plus5.addEventListener("click", () => changeTime(300));
plus10.addEventListener("click", () => changeTime(600));
minus5.addEventListener("click", () => changeTime(-300));
minus10.addEventListener("click", () => changeTime(-600));

min5.addEventListener("click", () => changePresetTime(300)); 
min10.addEventListener("click", () => changePresetTime(600)); 
min15.addEventListener("click", () => changePresetTime(900));
min20.addEventListener("click", () => changePresetTime(1200));
min25.addEventListener("click", () => changePresetTime(1500));
min30.addEventListener("click", () => changePresetTime(1800));
min45.addEventListener("click", () => changePresetTime(2700));
min60.addEventListener("click", () => changePresetTime(3600));



save.addEventListener("click", () => {
  localStorage.setItem("timeLeft", timeLeft);
  window.location.href = "index.html"
});

cancel.addEventListener("click", () => {
  window.location.href = "index.html"
});