const video = document.querySelector("video");

const play = document.getElementById("play");
const mute = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

let userVolume = 0.5;
video.volume = 0.5;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  play.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
  video.muted = !video.muted;
  mute.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : userVolume == 0 ? 0.5 : userVolume;
};

const handleVolumeChange = (event) => {
  const { value } = event.target;
  if (video.muted) {
    video.muted = false;
    mute.innerText = "Mute";
  }
  if (value == "0") {
    video.muted = true;
    mute.innerText = "Unmute";
  }
  userVolume = value;
  video.volume = value;
};

play.addEventListener("click", handlePlayClick);
mute.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
