import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addBook from '@/components/add-book';
import updateBook from '@/components/update-book';
import addAuthor from '@/components/add-author';
import addCategory from '@/components/add-category';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/add',
      component: addBook
    },
    {
      path: '/updata/:id',
      component: updateBook
    },
    {
      path: '/add_author',
      component: addAuthor
    },
    {
      path: '/add_category',
      component: addCategory
    }
  ]
})
