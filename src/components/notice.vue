<template>
<div class="main">
	<div class="notice" v-for="(item,key) in list" :key="key">
		<a href="#" @click.stop.prevent="btn(item.context)">{{item.title}}</a>
		<span> 发布于:{{item.time|forMatTime}}</span>
	</div>
</div>
</template>
<script>
	export default{
		name:'notice',
		data(){
			return{
				list:''

			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				this.axios.get('api/showNotice').then(response=>{
					this.list=response.data.data;

				});
			},
			btn(message){
				this.$alert(message, '网站公告', {
		          confirmButtonText: '确定'
		        });

			}
		}
	}
</script>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
.main{
	.notice{
		padding:10px;
		font-size:12px;
		border-bottom:1px dashed #ababab;
		border-top:1px dashed #ababab;	
		overflow:hidden;
		a{
			@include base_link;
		}
		span{
			float:right;
		}
	}
}

	
</style>