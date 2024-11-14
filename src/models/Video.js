import mongoose from "mongoose";

const formatHashtags = (hashtagString) =>
  hashtagString
    .split(",")
    .map((word) => word.trim()) // 콤마 앞뒤의 공백 제거
    .filter((word) => word.length > 0) // 빈 문자열 제외
    .map((word) => `#${word}`); // 해시태그 처리

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLenfth: 5,
    maxLenfth: 80,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 20,
    maxLength: 140,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

// videoSchema.pre("save", function () {
//   this.hashtags = formatHashtags(this.hashtags[0]);
// });

// videoSchema.pre("findOneAndUpdate", function () {
//   this._update.hashtags = formatHashtags(this._update.hashtags);
// });

videoSchema.static("formatHashtags", formatHashtags);

const Video = mongoose.model("Video", videoSchema);

export default Video;
