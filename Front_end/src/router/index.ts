import { createRouter, createWebHistory } from 'vue-router'
import store  from '../store';
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import ProfileUserView from '../views/ProfileUserView.vue'
import ProfileUserMeView from '../views/ProfileUserMeView.vue'
import DashBoardChat from '../views/DashBoardChatView.vue'

function isAuthenticated(){
  let isConnect = store.getters.getToken;
  if (isConnect == true)
    return true;
  else
    return false;
}

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
    {
      path: '/profile/me',
      name: 'profileUserMe',
      component: ProfileUserMeView,
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
      path: '/dashBoardChat',
      name: 'dashBoardChat',
      component: DashBoardChat,
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
