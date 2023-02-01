import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/pages/Home.vue'
import Albums from '../views/pages/Albums.vue'
import Comments from '../views/pages/Comments.vue'
import Photos from '../views/pages/Photos.vue'
import Posts from '../views/pages/Posts.vue'
import Todos from '../views/pages/Todos.vue'
import Users from '../views/pages/Users.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/albums',
      component: Albums,
    },
    {
      path: '/comments',
      component: Comments,
    },
    {
      path: '/photos',
      component: Photos,
    },
    {
      path: '/posts',
      component: Posts,
    },
    {
      path: '/todos',
      component: Todos,
    }
    ,
    {
      path: '/users',
      component: Users,
    }
  ]
})

export default router