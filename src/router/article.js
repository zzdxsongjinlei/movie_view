import NewDetail from '../page/newsDetail.vue'
import Topic from '../page/topic.vue'
export default[
	{
      path: '/newDetail/:id',
      name: 'newDetail',
      component: NewDetail
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    }
]
