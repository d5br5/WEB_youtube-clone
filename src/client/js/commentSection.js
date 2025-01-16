const form = document.getElementById("commentForm");
const video = document.querySelector("video");

const addComment = (text, commentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.comment_id = commentId;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = document.querySelector("textarea");

  const text = textarea.value;

  if (text === "") return;
  const res = await fetch(`/api/video/${video.id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (res.status === 201) {
    const data = await res.json();
    const { newCommentId } = data;
    addComment(text, newCommentId);
  }
};

form?.addEventListener("submit", handleSubmit);

const comments = document.querySelector(".video__comments ul");

const handleCommentButtonClick = async (e) => {
  const isButton = e.target.tagName === "BUTTON";
  if (!isButton) return;
  const comment = e.target.closest(".video__comment");
  if (!comment) return;
  const commentId = comment.dataset.comment_id;
  const videoId = video.id;

  const res = await fetch(`/api/video/${videoId}/comment/${commentId}`, {
    method: "DELETE",
  });

  if (res.status === 200) {
    comment.remove();
  }
};

comments?.addEventListener("click", handleCommentButtonClick);
