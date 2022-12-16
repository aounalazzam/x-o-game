/**
 * @license
 * This Source Code Is Written By Aoun Alazzam Under MIT License
 */

import App from "./App.vue";
import { createApp } from "vue";

// Mount App
createApp(App).mount("#app");

// Full Screen
let isFullscreen = false;

document.body.addEventListener("dblclick", () => {
  if (!isFullscreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }

  isFullscreen = !isFullscreen;
});
