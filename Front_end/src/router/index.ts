import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import ProfileUserView from '../views/ProfileUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/profile/user',
      name: 'profileUser',
      component: ProfileUserView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
  ]
})
export default router
