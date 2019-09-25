import axios from 'axios';
const state={
	article:[],
	article_list:[],
	article_detail:'',
	article_user:[],
	article_user_list:[],
	article_hot:[],
	article_hot_list:[],
	article_topic:[]
}
const getters={

};
const actions={
	getData({commit}){
		axios.get('api/showArticle').then(response=>{
			commit('setArticleList',response.data.data);
			commit('getArticleList',{page:1,page_size:10});
		});
	}
};
const mutations={
	setArticleList(state,value){
		state.article=value;
	},
	getArticleList(state,value){
		let start=(value.page-1)*(value.page_size);
		let end =value.page_size*value.page;
		state.article_list=state.article.slice(start,end);
	},
	getArticle(state,value){
		state.article_detail=state.article.filter(o=>o._id==value.article_id);
	},
	getUserArticle(state,value){
		state.article_user=state.article.filter(o=>o.articleUserId==value.articleUserId);

	},
	setUserArticleList(state,value){
		let start=(value.page-1)*value.page_size;
		let end =value.page*value.page_size;
		state.article_user_list=state.article_user.slice(start,end);
	},
	setHotArticle(state,value){
		let articles=[...state.article];
		articles.sort((a,b)=>b.articleNumSuppose-a.articleNumSuppose);
		state.article_hot=articles.slice(0,10);
	},
	setHotArticleList(state,value){
		let start=(value.page-1)*value.page_size;
		let end =value.page*value.page_size;
		state.article_hot_list=state.article_hot.slice(start,end);
	},
	setTopic(state){
		state.article_topic=new Set();
		state.article.map(o=>state.article_topic.add(o.articleTopic));

	}
}
export default{
	namespaced:true,
	state,
	getters,
	actions,
	mutations
}