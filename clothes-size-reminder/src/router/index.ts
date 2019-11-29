import Vue from 'vue';
import VueRouter from 'vue-router';

import TopNavBar from '@/components/shared/TopNavBar.vue';
import SideBar from '@/components/shared/SideBar.vue';
import FooterBar from '@/components/shared/FooterBar.vue';

Vue.use(VueRouter);

const baseDocumentPageTitle = 'Clothes Reminder';
const separatorPageTitle = '|';

const layout = {
  topNavBar: TopNavBar,
  sideBar: SideBar,
  footerBar: FooterBar,
};

const Home = () => import('../views/pages/Home.vue');
const Error404 = () => import('../views/without-layout/Error404.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      ...layout,
    },
  },
  {
    path: '/Error404',
    name: 'error404',
    component: Error404,
  },
  {
    path: '*',
    redirect: { name: 'error404' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let documentTitle: string = baseDocumentPageTitle;
  if (to.meta.title) {
    documentTitle += ` ${separatorPageTitle} ${to.meta.title}`;
  }
  document.title = documentTitle;
  next();
});

export default router;
