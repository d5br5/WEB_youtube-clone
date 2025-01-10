const video = document.querySelector("video");

const play = document.getElementById("play");
const mute = document.getElementById("mute");
const volumeRange = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

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

const parseTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const handleMetadata = () => {
  totalTime.innerText = parseTime(video.duration);
};

const updateCurrentTime = (e) => {
  currentTime.innerText = parseTime(video.currentTime);
};

play.addEventListener("click", handlePlayClick);
mute.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener("timeupdate", updateCurrentTime);
