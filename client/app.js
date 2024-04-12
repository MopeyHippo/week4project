
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const messageList = document.getElementById("messageList");
  
  async function fetchAndDisplayMessages() {
    messageList.innerHTML = "";
    try {
      const response = await fetch("http://localhost:8080/api/messages");
      const messages = await response.json();
      console.log (messages)
      messages.forEach((message) => {
        const messageItem = document.createElement("div");
        messageItem.classList.add("message");
        messageItem.textContent = message.text;
        messageList.appendChild(messageItem);
      });
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  }

async function handleSubmit(event) {
    event.preventDefault();
    const text = messageInput.value.trim();
    if (text === "") return;
console.log(text)
    try {
        const response = await fetch("http://localhost:8080/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error("HTTP error!");
        }

        messageInput.value = "";
        await fetchAndDisplayMessages();
    } catch (error) {
        console.error("Error submitting message:", error);
    }
}

messageForm.addEventListener("submit", handleSubmit);

fetchAndDisplayMessages();
