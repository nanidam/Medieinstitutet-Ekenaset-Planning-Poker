import { isAdmin } from "../stores/userStore";
import { renderEndSessionBtn } from "./EndSession";
import { renderSvg } from "./Svg";

export function renderLogo(parentElement: HTMLDivElement) {
  const logoContainer = document.createElement("div");
  logoContainer.classList.add("logo");
  parentElement.appendChild(logoContainer);
  renderSvg(logoContainer);

  if (isAdmin) {
    renderEndSessionBtn(logoContainer);
  }
}
