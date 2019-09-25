import MovieList from '../page/movieList.vue'
import MovieDetail from '../page/movieDetail.vue'
import MovieBuy from '../page/movieBuy.vue'

export default[
	 {
      path: '/movieList',
      name: 'movieList',
      component: MovieList
    }, 
    {
      path: '/movieDetail/:id',
      name: 'movieDetail',
      component: MovieDetail
    },
    {
      path: '/movieBuy',
      name: 'movieBuy',
      component: MovieBuy
    }
]  