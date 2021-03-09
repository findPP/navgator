import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/navPage",
    name: "NavPage",
    component: () => import("@/views/navPage/index.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
