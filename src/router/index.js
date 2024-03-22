import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import FriendsPage from '../pages/FriendsPage.vue'
import BalancesPage from '../pages/BalancesPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Главная',
      spinner: true,
      duration: 1500,
    },
    children: [
      // { path: 'scss', component: ScssView }, // default tab that shows on /about route
      // { path: 'js', component: JsView },
    ],
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsPage,
    meta: {
      title: 'Друзья',
    },
  },
  {
    path: '/balances',
    name: 'balances',
    component: BalancesPage,
    meta: {
      title: 'Балансы',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
