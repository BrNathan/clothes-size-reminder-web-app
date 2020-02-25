import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import TopNavBar from '@/components/shared/top-nav-bar.vue';
import SideBar from '@/components/shared/side-bar.vue';
import FooterBar from '@/components/shared/footer-bar.vue';

import Home from '@/views/pages/home.vue';

Vue.use(VueRouter);

const baseDocumentPageTitle = 'Ryclos';
const separatorPageTitle = '|';

const layout = {
  topNavBar: TopNavBar,
  sideBar: SideBar,
  footerBar: FooterBar,
};

const MyReminders = () => import('../views/pages/my-reminders.vue');
const Admin = () => import('../views/pages/admin.vue');
const AdminBrands = () => import('../components/admin/brands.vue');
const AdminUsers = () => import('../components/admin/users.vue');
const AdminClothes = () => import('../components/admin/clothes.vue');
const Error404 = () => import('../views/without-layout/error-404.vue');

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
        redirect: { name: 'admin' },
      },
      {
        path: 'clothes',
        name: 'AdminClothes',
        component: AdminClothes,
      },
    ],
  },
  {
    path: '/my-reminders',
    name: 'myReminders',
    components: {
      default: MyReminders,
      ...layout,
    },
    meta: {
      title: 'My reminders',
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
