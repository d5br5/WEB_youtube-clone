const video = document.querySelector("video");

const play = document.getElementById("play");
const mute = document.getElementById("mute");
const volumeRange = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

let userVolume = 0.5;
let isPlaying = false;
video.volume = userVolume;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
    isPlaying = true;
  } else {
    video.pause();
    isPlaying = false;
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

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleMetadata = () => {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = Math.floor(video.duration);
};

const updateCurrentTime = (e) => {
  currentTime.innerText = formatTime(video.currentTime);
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const { value } = event.target;
  video.currentTime = value;
};

const handleTimelineMouseDown = () => {
  console.log(isPlaying);
  video.pause();
};

const handleTimelineMouseUp = (event) => {
  if (isPlaying) {
    video.play();
  }
};

play.addEventListener("click", handlePlayClick);
mute.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener("timeupdate", updateCurrentTime);
timeline.addEventListener("input", handleTimelineChange);
timeline.addEventListener("mousedown", handleTimelineMouseDown);
timeline.addEventListener("mouseup", handleTimelineMouseUp);
