import Vue from "vue";
import { NuxtHammer } from "../index.min";
import App from "./App.vue";

//use the plugin
Vue.use(NuxtHammer);

new Vue({
  el: "#app",
  data: {
    event: "",
  },
  render: (h) => h(App),
});
