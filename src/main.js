import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { Post, Get, Del, Put } from "./utils/fetch";

Vue.prototype.yPost = Post;
Vue.use(ElementUI);
Vue.prototype.yPost = Post;
Vue.prototype.yGet = Get;
Vue.prototype.yDel = Del;
Vue.prototype.yPut = Put;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
