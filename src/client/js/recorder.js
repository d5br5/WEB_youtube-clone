import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let timeout;

const FILES = {
  input: "recording.webm",
  output: "recording.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

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
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.autoplay = true;
    actionBtn.innerText = "Download Recording";
    actionBtn.removeEventListener("click", handleStop);
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  timeout = setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const handleStop = () => {
  recorder.stop();
  clearTimeout(timeout);
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  ffmpeg.on("log", ({ type, message }) => console.log(message));
  ffmpeg.writeFile(FILES.input, await fetchFile(videoFile));
  await ffmpeg.exec(["-i", FILES.input, "-r", "60", FILES.output]);
  await ffmpeg.exec([
    "-i",
    FILES.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    FILES.thumbnail,
  ]);

  const mp4File = await ffmpeg.readFile(FILES.output);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  downloadFile(mp4Url, FILES.output);

  const thumbnailFile = await ffmpeg.readFile(FILES.thumbnail);
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  downloadFile(thumbnailUrl, FILES.thumbnail);

  ffmpeg.deleteFile(FILES.input);
  ffmpeg.deleteFile(FILES.output);
  ffmpeg.deleteFile(FILES.thumbnail);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbnailUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  init();
  actionBtn.addEventListener("click", handleStart);
};

actionBtn.addEventListener("click", handleStart);
