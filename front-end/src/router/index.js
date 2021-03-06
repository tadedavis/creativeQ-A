import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
  },
  {
      path: "/answerform/:id",
      name: "AnswerForm",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/AnswerForm.vue"),
  },
  {
      path: "/questionform/",
      name: "QuestionForm",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/QuestionForm.vue"),
  },
  {
    path: "/about/:id",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
