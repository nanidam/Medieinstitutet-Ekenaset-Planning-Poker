import { app } from '../main';
import socket from '../socket';
import { userName } from '../stores/userStore';
import LoginScreen from './LoginScreen';

export function Logout(parentElement: HTMLDivElement) {
  const btnContainer = document.createElement('div');
  const logoutBtn = document.createElement('button');
  logoutBtn.classList.add('logout-btn');
  btnContainer.classList.add('logout-btn-container');
  logoutBtn.innerHTML = 'Logout';

  btnContainer.appendChild(logoutBtn);
  parentElement.appendChild(btnContainer);

  logoutBtn.addEventListener("click", () => {
    socket.emit("logout", userName);


    LoginScreen(app!);
  });
}
