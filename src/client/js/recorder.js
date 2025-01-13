import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const recordBtn = document.getElementById("recordBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let timeout;

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
    audio: false,
  });

  video.srcObject = stream;
  video.play();
};

init();

const handleStart = () => {
  recordBtn.innerText = "Stop Recording";
  recordBtn.removeEventListener("click", handleStart);
  recordBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.autoplay = true;
    recordBtn.innerText = "Download Recording";
    recordBtn.removeEventListener("click", handleStop);
    recordBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  timeout = setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const handleStop = () => {
  recorder.stop();
  clearTimeout(timeout);
  recordBtn.innerText = "Download Recording";
  recordBtn.removeEventListener("click", handleStop);
  recordBtn.addEventListener("click", handleDownload);
};

const handleDownload = async () => {
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  recordBtn.innerText = "Transcoding...";

  ffmpeg.on("log", ({ type, message }) => console.log(message));
  ffmpeg.writeFile("recording.webm", await fetchFile(videoFile));
  await ffmpeg.exec(["-i", "recording.webm", "-r", "60", "output.mp4"]);
  await ffmpeg.exec([
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg",
  ]);

  const mp4File = await ffmpeg.readFile("output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

  const thumbnailFile = await ffmpeg.readFile("thumbnail.jpg");
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const mp4A = document.createElement("a");
  mp4A.href = mp4Url;
  mp4A.download = "MyRecording.mp4";
  document.body.appendChild(mp4A);
  mp4A.click();
  recordBtn.innerText = "Download Recording";

  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
  const thumbnailA = document.createElement("a");
  thumbnailA.href = thumbnailUrl;
  thumbnailA.download = "MyThumbnail.jpg";
  document.body.appendChild(thumbnailA);
  thumbnailA.click();
};

recordBtn.addEventListener("click", handleStart);
