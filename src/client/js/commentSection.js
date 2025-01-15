const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = document.querySelector("textarea");
  const video = document.querySelector("video");
  const text = textarea.value;

  if (text === "") return;
  fetch(`/api/video/${video.id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
};

form?.addEventListener("submit", handleSubmit);
