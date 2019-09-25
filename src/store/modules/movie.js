import axios from 'axios'
const state={
	movie_list:'',
	on_movie:'',
	coming_movie:'',
	hot_movie:'',
	down_movie:'',
	on_movie_list:'',
	coming_movie_list:''
}
const getters={
	getHotMovieList(state){
		state.hot_movie=[...state.movie_list];
		state.hot_movie.sort(function(a,b){ return b.movieNumWantSee-a.movieNumWantSee});
		return  state.hot_movie.slice(0,10);
	},
	getDownloadMovieList(state){
		state.down_movie=[...state.movie_list];
		state.down_movie.sort(function(a,b){return b.movieDownload-a.movieDownload});
		return state.down_movie.slice(0,10);
	}
};
const actions={
	getData({commit}){
		axios.get('api/showRanking').then(response=>{
			commit('setMovieList',response.data.data);
			commit('getOnMovieList',{page:1,page_size:5});
			commit('getComingMovieList',{page:1,page_size:5});
		});

	}

};
const mutations={
	setMovieList(state,value){
		let now_time=(new Date().getTime());
		state.movie_list=value;	
		
		state.on_movie=value.filter(o=>{return o.movieShowTime<now_time});
		state.coming_movie=value.filter(o=>{ return o.movieShowTime>=now_time});
	},
	getOnMovieList(state,value){
		let start=(value.page-1)*(value.page_size);
		let end=value.page_size*value.page;
	 	state.on_movie_list=state.on_movie.slice(start,end);
	},
	getComingMovieList(state,value){
		let start=(value.page-1)*(value.page_size);
		let end=value.page_size*value.page;
		state.coming_movie_list=state.coming_movie.slice(start,end);
	}
}
export default{
	namespaced:true,
	state,
	getters,
	actions,
	mutations
}