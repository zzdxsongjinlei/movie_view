<template>
	<div class="sendtalkbox">
		<h2>发邮件</h2>
		<div>
			<el-form ref="form" :model="form" label-width="60px" >
				<el-form-item label="收件人">
					<el-input v-model="form.username" @blur="usernameBlur" ref="username"></el-input>
				</el-form-item>
				<el-form-item label="标题">
					<el-input v-model="form.title"  @focus="titleFocus" ref="title"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="form.context" @focus="contextFocus"  ref="context" maxlength="500"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="send_mail">提交</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				form:{
					username:'',
					title:'',
					context:''
				},
				toUser:''
			}
		},
		methods:{
			titleFocus(){
				if(this.form.username==''){
					this.mes.errorMessage('用户名不能为空');
					return this.$refs.username.focus();
				}
			},
			contextFocus(){
				if(this.form.title==''){
					this.mes.errorMessage('标题不能为空');
					return this.$refs.title.focus();
				}
			},
			usernameBlur:function(event){
				if(this.form.username!==''){
					if(this.form.username==localStorage.username){
						this.mes.errorMessage('不能给自己发站内信');
						this.form.username='';

						return this.$refs.username.focus();
					}
					else{
						this.axios.post('api/users/userDetail',{username:this.form.username}).then(response=>{
							if(response.data.status==1){
								this.mes.errorMessage(response.data.message);
								this.form.username='';
								this.toUser='';
								return this.$refs.username.focus();
							}
							else{
								if(response.data.data[0].userBlack.indexOf(localStorage._id)>=0){
									this.mes.errorMessage('您在对方的黑名单中，不能发送站内信');
									this.form.username='';
									this.toUser='';
									return this.$refs.username.focus();
								}
								else{
									this.toUser=response.data.data[0]._id;
									let user_id=localStorage._id;
									 this.axios.post('api/users/userDetail',{user_id:user_id}).then(res=>{
										if(res.data.status==1){
											this.mes.errorMessage(res.data.message);
										}
										else{
											if(res.data.data[0].userBlack.indexOf(this.toUser)!==-1){
												this.mes.errorMessage('收件人在您的黑名单里，不能发送，请先移出');
												this.form.username='';
												this.toUser='';
												return this.$refs.username.focus();
											}
										}
									 });

								}
							}	
						});
					}
				}
			},
			send_mail:function(){
				if(this.form.context==''){
					this.mes.errorMessage('内容不能为空');
					return this.$refs.context.focus();
				}
				let sendDate={
					title:this.form.title,
					context:this.form.context,
					toUser:this.toUser,
					token:localStorage.token,
					user_id:localStorage._id,
				};
				this.axios.post('api/users/sendEmail',sendDate).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.promptMessage('发送成功，2秒后跳转到收件箱');
						setTimeout(()=>{
							this.$router.push({path:'/sendEmail'});

						},2000);
						
					}
				})

			}
		}

	}
</script>
<style lang="scss" scoped>
	.sendtalkbox{
		h2{
			color:rgb(73,73,73);
			font-size:26px;
			line-height:28px;
			padding-bottom:15px;
		
		}
		>div{
			width:80%;
			margin-top:30px;
		}
	}

</style>































