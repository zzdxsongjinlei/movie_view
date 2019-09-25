<template>
	<div class="header">
		<div class="main">
			<div class="left">
				<router-link to="/">
					<div class="header_menu">主页</div>
				</router-link>
				<router-link to="/movieList">
					<div class="header_menu">电影</div>
				</router-link>
			</div>
			<div class="right">
				<router-link :to="{path:'/adminPage'}">
					<div class="header_menu">
						后台
					</div>
				</router-link>
				
			</div>

			
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped lang="scss" >
	.header{
		width:100%;
		height:60px;
		position:fixed;
		left:0;
		top:0;
		z-index:2;
		background-color:#545652;
		.main{
			width:80%;
			margin:0px auto;
			overflow:hidden;
			.left{
				float:left;
				.header_menu{
					padding-right:60px;
					padding-top:20px;
					float:left;
					color:rgb(213,213,213);
				}
			}
			.right{
				float:right;
				.header_menu{
					padding-top:20px;
					color:rgb(213,213,213);
				}
			}
			
		}
		
	}
	
</style>