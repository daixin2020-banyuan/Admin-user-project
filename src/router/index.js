import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/regist",
    name: "regist",
    component: () => import("../views/regist.vue")
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/user/user.vue"),
    redirect: "/user/personal",
    children: [
      {
        path: "personal",
        name: "personal",
        component: () => import("../views/user/personal.vue")
      },
      {
        path: "mall",
        name: "mall",
        component: () => import("../views/user/mall.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    if (to.name !== "regist") {
      const isLogin = localStorage.getItem("userInfo") || "";
      if (!isLogin) {
        next({
          name: "login"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
