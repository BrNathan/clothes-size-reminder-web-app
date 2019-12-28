import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import TopNavBar from '@/components/shared/TopNavBar.vue';
import SideBar from '@/components/shared/SideBar.vue';
import FooterBar from '@/components/shared/FooterBar.vue';

import Home from '@/views/pages/Home.vue';

Vue.use(VueRouter);

const baseDocumentPageTitle = 'Clothes Reminder';
const separatorPageTitle = '|';

const layout = {
  topNavBar: TopNavBar,
  sideBar: SideBar,
  footerBar: FooterBar,
};

const Admin = () => import('../views/pages/Admin.vue');
const AdminBrands = () => import('../components/admin/Brands.vue');
const AdminUsers = () => import('../components/admin/Users.vue');
const AdminClothes = () => import('../components/admin/Clothes.vue');
const Error404 = () => import('../views/without-layout/Error404.vue');

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      ...layout,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: Admin,
      ...layout,
    },
    children: [
      {
        path: 'brands',
        name: 'AdminBrands',
        component: AdminBrands,
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers,
      },
      {
        path: 'clothes',
        name: 'AdminClothes',
        component: AdminClothes,
      },
    ],
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
