<template>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>
		<div class="contentMain">
			<el-row :gutter="60">
				<el-col :span="16">
					暂未开通此项功能
				</el-col>
				<el-col :span="8">
					cde
				</el-col>
			</el-row>

		</div>
		<div>
			<common-footer/>
		</div>
	</div>
</template>
<script>
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	export default{
		name:'movieBuy',
		data(){
			return{

			}
		},
		created(){
		},
		methods:{

		},
		components:{
			MovieIndexHeader,
			CommonFooter
		}
	}


</script>
<style lang="scss" scoped>
.container{
	.contentMain{
		width:1150px;
		margin:100px auto;

	}
}
</style>