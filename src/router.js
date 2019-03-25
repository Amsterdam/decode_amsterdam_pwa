import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/question",
      name: "question",
      component: () =>
        import(/* webpackChunkName: "question" */ "./views/QuestionView.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./views/ProfileView.vue")
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: () =>
        import(/* webpackChunkName: "onboarding" */ "./views/OnboardingView.vue")
    },
    {
      path: "/disclosure",
      name: "disclosure",
      component: () =>
        import(/* webpackChunkName: "disclosure" */ "./views/DisclosureView.vue")
    },
    {
      path: "/scan",
      name: "scan",
      component: () =>
        import(/* webpackChunkName: "scan" */ "./views/ScanView.vue")
    },
    {
      path: "/",
      name: "box",
      component: () =>
        import(/* webpackChunkName: "box" */ "./views/FindTheBoxView.vue")
    },
    // {
    //   path: "/zenroom",
    //   name: "zenroom",
    //   component: () =>
    //     import(/* webpackChunkName: "zenroom" */ "./views/zenroom.vue")
    // }    
  ]
});
