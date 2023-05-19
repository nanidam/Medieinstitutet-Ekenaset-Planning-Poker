import socket from "../socket";
import "../style/SessionMessage.scss";

export function renderEndSessionBtn(parentElement: HTMLDivElement) {
  const endSessionBtn = document.createElement("button");

  endSessionBtn.classList.add("end-session-btn");
  endSessionBtn.innerHTML = "end session";

  parentElement.appendChild(endSessionBtn);

  endSessionBtn.addEventListener("click", () => {
    socket.emit("endsession");
  });
}

export function renderEndSession(parentElement: HTMLDivElement) {
  parentElement.innerHTML = "";
  const sessionMessage = document.createElement("div");
  sessionMessage.classList.add("session-ending-message");

  if (sessionMessage) {
    let countDown = 5;
    sessionMessage.innerHTML = `<p>Admin has ended the session, you are being sent to the login screen in <span class="countdown">${countDown}</span> seconds</p> <img src="../end-session.png" />`;

    const countdown = setInterval(() => {
      countDown--;
      sessionMessage.innerHTML = `<p>Admin has ended the session, you are being sent to the login screen in <span class="countdown">${countDown}</span> seconds</p> <img src="../end-session.png" />`;
      if (countDown === 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }

  parentElement.appendChild(sessionMessage);
}
