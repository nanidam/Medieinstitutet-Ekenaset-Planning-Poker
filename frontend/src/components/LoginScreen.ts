import "../style/LoginScreen.scss";
import GameScreen from "./GameScreen";
import { userName, changeName } from "../stores/userStore.ts";
import socket from "../socket.ts";
import gsap from "gsap";

const login = (evt: Event) => {
  evt.preventDefault();

  if (userName === "") {
    alert("You must enter a name");
    return;
  }
  socket.emit("login", userName);
  GameScreen(document.querySelector("#app")!);
};

const updateName = (evt: Event) => {
  changeName((evt.target as HTMLInputElement).value);
};

const createImage = (parentElement: HTMLDivElement) => {
  const bigLogo = document.createElement("img");
  bigLogo.className = "big-logo"
  bigLogo.id = "big-logo"
  bigLogo.setAttribute("src", "../planningpoker_logo_startpage.png")

  parentElement.appendChild(bigLogo);
};

const createHeading = (parentElement: HTMLDivElement) => {
  const headingContainer = document.createElement("div");
  const heading = document.createElement("h1");
  heading.innerText = "WELCOME TO";
  headingContainer.appendChild(heading);
  parentElement.prepend(headingContainer);
};

const createTagLine = (parentElement: HTMLDivElement) => {
  const tagLines: string[] = [
	"A GAME FOR THE " + "<span class=\"tag-line\">" + "SCRUM" + "</span>" + "-PTIOUS",
	"JUST ANOTHER " + "<span class=\"tag-line\">" + "(S)CRUMMY " + "</span>" + "WEBSITE",
	"A GAME TO SUM UP NUMS FOR YOUR " + "<span class=\"tag-line\">" + "SCRUMS" + "</span>"
  ];

  const tagLine = document.createElement("h2");
  tagLine.innerHTML = tagLines[0];
  parentElement.appendChild(tagLine);

  const random = Math.floor(Math.random() * tagLines.length);

  tagLine.innerHTML = tagLines[random];
}

const createForm = (parentElement: HTMLDivElement) => {
  const form = document.createElement("form");
  form.classList.add("login-form");

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Enter your name";
  nameInput.classList.add("input-name");
  nameInput.addEventListener("input", updateName);
  form.appendChild(nameInput);

  const loginBtn = document.createElement("button");
  loginBtn.type = "submit";
  loginBtn.classList.add("login-btn");
  loginBtn.innerText = "Login";
  loginBtn.addEventListener("click", login);
  form.appendChild(loginBtn);

  parentElement.appendChild(form);
};

const LoginScreen = (parentElement: HTMLDivElement) => {
  parentElement.innerHTML = "";
  const loginScreen = document.createElement("div");
  loginScreen.classList.add("login-screen");
  createImage(loginScreen);
  createHeading(loginScreen);
  createTagLine(loginScreen);
  createForm(loginScreen);

  parentElement.appendChild(loginScreen);

  gsap.to('#big-logo', {
	rotation: 360, 
	duration: 10, 
	transformOrigin: 'center center', 
	repeat: -1,
	ease: 'none',
  });
};

export default LoginScreen;
