import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/index'
import admin from './admin.js'
import user from './user.js'
import article from './article.js'
import movie from './movie.js'

Vue.use(Router)

export default new Router({
  routes: [
    ...admin,
    ...user,
    ...article,
    ...movie,
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
