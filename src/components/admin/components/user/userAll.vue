<template>
	<div>
		<div class="main">
			<div class="btn">
				<router-link :to="{path:'/adminPage/user/userManage/userAdd'}"><el-button size="mini" type="primary"> 添加用户</el-button></router-link><router-link :to="{path:'/adminPage/user/userManage/userRev'}"><el-button size="mini" type="primary"> 编辑用户</el-button></router-link>
				<el-input v-model="search" size='mini' placeholder="输入姓名进行查找" style="width:200px;" suffix-icon="el-icon-search" />
			</div>

			<el-table ref="multipleTable" :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"  border  >
					<el-table-column type="index" align="center"></el-table-column>
					<el-table-column prop="userImg" label="头像" width="60" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.userImg" style="width:30px;">
						</template> 
					</el-table-column>
				    <el-table-column label="用户名"  width="100" align="center">
				    	<template slot-scope="scope">
				    		<el-tag size="medium">
				    			{{scope.row.username}}
				    		</el-tag>
				    	</template>
				     </el-table-column>
				     <el-table-column prop="userMail" label="邮箱" align="center"></el-table-column>
				    <el-table-column prop="userCity" label="地址" align="center" width="100"> </el-table-column>
				    <el-table-column label="注册时间" :sortable="true" :sort-method="sortByDate" align="center"> 
				    	<template slot-scope="scope">
				    		<i class="el-icon-time"></i>
				    		<span style="margin-left:10px">{{scope.row.userJoinTime| forMatTime}}</span>
				    	</template>
				    </el-table-column>
				    <el-table-column label="管理员"  prog="userAdmin" :filters="[{text:'是',value:true},{text:'否',value:false}]" :filter-method="filterAdmin" filter-placement="bottom-end" align="center" width="100">
				    	<template slot-scope="scope">
				    		<el-tag size="medium" :type="scope.row.userAdmin===true ?'primary' :'success'" disable-transitions>{{scope.row.userAdmin|formatAdmin}}</el-tag>
				    	</template> 
				    
				    </el-table-column>

				    <el-table-column  label="账户状态" prog="userStop" :filters="[{text:'正常',value:false},{text:'封停',value:true}]" :filter-method="filterStop" filter-placement="bottom-end" align="center" width="100"> 
						<template slot-scope="scope">
							<el-tag size="medium" :type="scope.row.userStop===true ?'danger':'primary'">{{scope.row.userStop|formatStop}}</el-tag>
						</template>
				    </el-table-column>
		    </el-table>
		    <el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="user.length">

    		</el-pagination>
		</div>
	</div>
</template>
<script>
	export default{
		name:'userAll',
		data(){
			return{
		        multipleSelection:[],
		        user:[],
		        search:'',
		        pagesize:10,
		        userList:[]
			}
		},
		created(){
			this.getData();
			
		},
		filters:{
			formatAdmin(value){
				if(value){
					return '是';
				}
				else{
					return '否';
				}
			},
			formatStop(value){
				
				if(value){
					return '封停';
				}
				else{
					return '正常';
				}

			}

		},
		methods:{
			sortByDate(obj1,obj2){
				return obj1.userJoinTime-obj2.userJoinTime;
			},
			filterAdmin( value,row){
				return row.userAdmin===value;
			},
			filterStop(value,row){
				return row.userStop===value;
			},
			handleCurrentChange(val){
				this.getuserList(val,this.pagesize);
			},
			getData(){
				let username=localStorage.username;
				let token=localStorage.token;
				let id=localStorage._id;
				this.axios.post('api/admin/showUser',{username:username,token:token,id:id}).then(response=>{
					this.user=response.data.data;
					this.getuserList(1,this.pagesize);
				});
			},
			getuserList(page,pagesize){
				 this.userList=this.user.slice((page-1)*pagesize,page*pagesize);
			}

		}

	}
</script>
<style  lang="scss">
	.main{
		padding:10px 10px 0px 10px;
		.btn{
			margin-bottom:10px;
			overflow:hidden;
			.el-button{
				margin-right:10px;
			}
			.el-input{
				float:right;
			}
		}
		.el-table td{
			padding:2px 0px;
		}
		.el-pagination{
			margin-top:10px;
			float:right;
		}
	}

</style>