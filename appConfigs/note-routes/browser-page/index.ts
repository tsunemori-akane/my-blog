import { css } from "./css-page";
import { html } from "./html-page";

export const browser = {
  name: "Browser",
  prefix: "/docs/browser",
  children: [
    html,
    css,
    {
      name: "浏览器架构",
      route: "/docs/browser/architecture"
    }
  ]
}