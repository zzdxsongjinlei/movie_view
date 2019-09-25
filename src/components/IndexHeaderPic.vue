<template>
	<div class="img">
		<el-carousel  height="300px" indicator-position="outside" type="card"> 
			<el-carousel-item v-for="(item,key) in list" :key="key" >
				<img :src="item.recommendImg">
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		}, 
		props:['list'],
		created(){
		}

	}
</script>
<style lang="scss" scoped>
.img{
	z-index:1;
}
.el-carousel__item{
	text-align:center;
	img{
		height:300px;
		width:600px;
	}
}
</style>