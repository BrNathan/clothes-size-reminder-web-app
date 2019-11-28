import Vue from 'vue';
import VueRouter from 'vue-router';

import TopNavBar from "@/components/TopNavBar.vue";
import SideBar from "@/components/SideBar.vue";
import FooterBar from "@/components/FooterBar.vue";

Vue.use(VueRouter);

const layout = {
	topNavBar: TopNavBar,
	sideBar: SideBar,
	footerBar: FooterBar
};

const Home = () => import('../views/Home.vue');
const Error404 = () => import('../views/Error404.vue');

const routes = [
	{
		path: '/',
		name: 'home',
		components: {
			default: Home,
			...layout
		}
	},
	{
		path: '/Error404',
		name: 'error404',
		component: Error404
	},
	{
		path: '*',
		redirect: {name: 'error404'}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router
