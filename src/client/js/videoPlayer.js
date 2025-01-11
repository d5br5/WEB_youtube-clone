const video = document.querySelector("video");

const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");

const volumeRange = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");

const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
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
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = () => {
  video.muted = !video.muted;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : userVolume == 0 ? 0.5 : userVolume;
};

const handleVolumeChange = (event) => {
  const { value } = event.target;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  if (value == "0") {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
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
  video.pause();
};

const handleTimelineMouseUp = (event) => {
  if (isPlaying) {
    video.play();
  }
};

const updateFullscreenIcon = () => {
  fullScreenIcon.classList = document.fullscreenElement
    ? "fas fa-compress"
    : "fas fa-expand";
};

const handleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
  updateFullscreenIcon();
};

const setHideControlTimeout = () => {
  const hideControls = () => videoControls.classList.remove("showing");
  controlsTimeout = setTimeout(hideControls, 1000);
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  videoControls.classList.add("showing");
  setHideControlTimeout();
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
fullScreenIcon.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
document.addEventListener("fullscreenchange", updateFullscreenIcon);
