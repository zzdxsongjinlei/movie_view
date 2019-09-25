import Vue from 'vue';
import Vuex from 'vuex';
import movie from './modules/movie.js'
import article from './modules/article.js'
 Vue.use(Vuex);

 const state={};
 const actions={};
 const mutations={};
 const store =new Vuex.Store({
 	modules:{
 		movie,
 		article
 	},
 	actions,
 	state,
 	mutations
 });
 export default store;
