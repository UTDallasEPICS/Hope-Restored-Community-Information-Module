import { createApp } from "vue";
import Wordpress from "./pages/Wordpress.vue";
import "./assets/css/App.css";

const app = createApp(Wordpress);
app.mount("#app");
