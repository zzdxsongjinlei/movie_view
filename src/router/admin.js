import AdminPage from '../page/adminPage.vue'
import index from '../components/admin/page/index.vue'

import user from '../components/admin/page/user.vue'
import userIndex from '../components/admin/page/userIndex.vue'

import userAll from '../components/admin/components/user/userAll.vue'
import userManage from '../components/admin/components/user/userManage.vue'
import userManageIndex from '../components/admin/components/user/userManageIndex.vue'
import userAdd from '../components/admin/components/user/userAdd.vue'
import userRev from '../components/admin/components/user/userRev.vue'


import websiteBuilt from '../components/admin/page/websiteBuilt.vue'
import websiteBuiltIndex from '../components/admin/page/websiteBuiltIndex.vue'

import websiteIndex from '../components/admin/components/websitebuilt/websiteIndex.vue'
import websiteIndexIndex from '../components/admin/components/websitebuilt/websiteIndexIndex.vue'

import planting from '../components/admin/components/websitebuilt/planting.vue'
import websiteNotice from '../components/admin/components/websitebuilt/websiteNotice.vue'

import movie from '../components/admin/components/websitebuilt/movie.vue'
import movieIndex from '../components/admin/components/websitebuilt/movieIndex.vue'
import movieDetail from '../components/admin/components/websitebuilt/movieDetail.vue'
import movieAdd from '../components/admin/components/websitebuilt/movieAdd.vue'
import movieActivity from '../components/admin/components/websitebuilt/movieActivity.vue'
import article from '../components/admin/components/websitebuilt/article.vue'
import articleIndex from '../components/admin/components/websitebuilt/articleIndex.vue'
import articleDetail from '../components/admin/components/websitebuilt/articleDetail.vue'
import articleAdd from '../components/admin/components/websitebuilt/articleAdd.vue'


import communication from '../components/admin/page/communication.vue'
import communicationIndex from '../components/admin/page/communicationIndex.vue'

import email from '../components/admin/components/communication/email.vue'
import articleComment from '../components/admin/components/communication/articleComment.vue'
import movieComment from '../components/admin/components/communication/movieComment.vue'
import userInfoComment from '../components/admin/components/communication/userInfoComment.vue'

export default[{
    path: '/adminPage',
    name: 'adminPage',
    component: AdminPage,
    meta: { title: '首页' },
    children:[
        {
          path:'',
          component:index,
          name:'index'

        },
        {
          path:'user',
          component:user,
          name:'user',
          meta: { title: '用户' },
          children:[
              {
                path:'',
                component:userIndex,
                name:'userIndex'
              },
              {
                path:'userAll',
                component:userAll,
                name:'userAll',
                meta: { title: '全部用户' }
              },
              {
                path:'userManage',
                component:userManage,
                name:'userManage',
                meta: { title: '用户管理' },
                children:[
                    {
                      path:'',
                      component:userManageIndex,
                      name:'userManageIndex' 
                    },
                    {
                      path:'userAdd',
                      component:userAdd,
                      name:'userAdd',
                      meta: { title: '添加用户' }
                    },
                    {
                      path:'userRev',
                      component:userRev,
                      name:'userRev',
                      meta: { title: '编辑用户' }
                    }
                ]
              }
          ]
        },
        {
          path:'websiteBuilt',
          component:websiteBuilt,
          name:'websiteBuilt',
          meta: { title: '网站建设' },
          children:[
              {
                path:'',
                component:websiteBuiltIndex,
                name:'websiteBuiltIndex'
              },
              {
                path:'websiteIndex',
                component:websiteIndex,
                name:'websiteIndex',
                meta: { title: '网站首页' },
                children:[
                    {
                      path:'',
                      component:websiteIndexIndex,
                      name:'websiteIndexIndex' 
                    },
                    {
                      path:'planting',
                      component:planting,
                      name:'planting',
                      meta: { title: '轮播图' },
                    },
                    {
                      path:'websiteNotice',
                      component:websiteNotice,
                      name:'websiteNotice',
                      meta: { title: '网站公告' },
                    }
                ]
              },
              {
                path:'movie',
                component:movie,
                name:'movie',
                meta: { title: '电影' },
                children:[
                    {
                      path:'',
                      component:movieIndex,
                      name:'movieIndex' 
                    },
                    {
                      path:'movieDetail',
                      component:movieDetail,
                      name:'movieDetail',
                      meta: { title: '电影详情' }
                    },
                    {
                      path:'movieAdd',
                      component:movieAdd,
                      name:'movieAdd',
                      meta: { title: '添加电影' }
                    },
                    {
                      path:'movieActivity',
                      component:movieActivity,
                      name:'movieActivity',
                      meta: { title: '电影活动' }
                    }
                ]
              },
              {
                path:'article',
                component:article,
                name:'article',
                meta: { title: '文章' },
                children:[
                    {
                      path:'',
                      component:articleIndex,
                      name:'articleIndex' 
                    },
                    {
                      path:'articleDetail',
                      component:articleDetail,
                      name:'articleDetail',
                      meta: { title: '文章详情' }
                    },
                    {
                      path:'articleAdd',
                      component:articleAdd,
                      name:'articleAdd',
                      meta: { title: '添加文章' }
                    }
                ]
              }   
          ]
        },
        {
          path:'communication',
          component:communication,
          name:'communication',
          meta: { title: '站内通信' },
          children:[
              {
                path:'',
                component:communicationIndex,
                name:'communicationIndex'
              },
              {
                path:'email',
                component:email,
                name:'email',
                meta: { title: '站内信' }
              },
               {
                path:'articleComment',
                component:articleComment,
                name:'articleComment',
                meta: { title: '文章评论' }
              },
               {
                path:'movieComment',
                component:movieComment,
                name:'movieComment',
                meta: { title: '电影评论' }
              },
               {
                path:'userInfoComment',
                component:userInfoComment,
                name:'userInfoComment',
                meta: { title: '主页留言' }
              },

          ]
        }

    ]

}];