export default [{
  name: "home",
  path: "/",
  component: () => import("./pages/Home.vue"),
}, {
  name: "about",
  path: "/about",
  component: () => import("./pages/About.vue"),
}];
