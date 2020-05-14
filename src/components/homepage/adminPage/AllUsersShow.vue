<template>
    <div style="z-index: 2020;"><!--显示班级所有用户的弹框  一直显示 调用父组件方法控制显示不显示-->
    
          <div  v-on:click="hidePanel" v-show="show" style="background:rgba(208,208,208,0.8);width:100%;height:100vh;position:fixed;top:0;">
                <el-table 
                id="myPanel"
                 stripe
                :class="[this._isMobile() ? 'mytablePhone' : 'mytable']"
                  v-loading="loading"
                  
                 :data="users.filter(user =>  !searchs || user.username.toLowerCase().includes(searchs.toLowerCase()) ||user.name.toLowerCase().includes(searchs.toLowerCase()) )"
                >
                    <el-table-column property="username" label="学号" min-width="82px" ></el-table-column>
                    <el-table-column property="name" label="姓名" ></el-table-column>
                    <el-table-column property="time" label="注册时间" min-width="82px" ></el-table-column>
                    <el-table-column property="power" >
                          <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="searchs"
                            size="mini"
                            style="width:80%"
                            clearable
                            placeholder="学号姓名搜索"/>
                        </template>
                         <template slot-scope="scope">
                            <el-button
                                v-if="!scope.row.power"
                                type="info"
                                @click.native.prevent="grant(scope.row.username)"
                                size="small">
                                设为管理
                            </el-button>
                            <el-button
                                v-else
                                type="warning"
                                @click.native.prevent="revoke(scope.row.username)"
                                size="small">
                                取消管理
                            </el-button>
                        </template>
                     </el-table-column>
                </el-table>
           </div>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading:true, // 显示加载
            show:true,
            users: [], 
            searchs:''
        }
    },
    mounted(){
       this.getAllUsers(); 
   
    },
    methods:{
        getAllUsers(){  //获取一个班级的学生的信息
           this.axios({  
                method:"post",
                url:"/selectAllUser",
                data:this.qs.stringify({adminUsername:this.$store.state.userinfo.username,classId:this.$store.state.userinfo.classId}), 
                })
            .then(res =>{
                console.log(res.data);
                if(res.data.code===200){
                    this.users = res.data.data;
                    //this.$message(res.data.data)
                    this.loading = false;
                }
                else
                    this.$message(res.data.data)
                
            })
            .catch(err =>{
                console.log(err);
            })  
        },
         _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        grant(username){    //授权
          console.log(username);
           this.axios({  
                method:"post",
                url:"/grant",
                data:this.qs.stringify({adminUsername:this.$store.state.userinfo.username,username:username}), 
                })
            .then(res =>{
                console.log(res.data);
                if(res.data.code === 200){
                    this.getAllUsers();
                }
                this.$message(res.data.data)
            })
            .catch(err =>{
                console.log(err);
            }) 
        },
        revoke(username){   //取消授权
         console.log(username);
           this.axios({  
                method:"post",
                url:"/revoke",
                data:this.qs.stringify({adminUsername:this.$store.state.userinfo.username,username:username}), 
                })
            .then(res =>{
                console.log(res.data);
                 if(res.data.code === 200){
                    this.getAllUsers();
                }
                this.$message(res.data.data)
            })
            .catch(err =>{
                console.log(err);
            }) 
        },
         close(){ //这个弹框关闭的回调
            console.log("关闭");
            this.$emit("changeAllUsersShow");     //调用父组件的方法关闭发布作业的弹框
        },
        hidePanel(event){
            let sp = document.getElementById("myPanel");
            if(sp && !sp.contains(event.target)){
                     this.$emit("changeAllUsersShow");
                }
            }
    }
}
</script>
<style scoped>
.mytable {
    width: 60%;
    margin: 0 auto;
    margin-top: 10vh;
    font-size:0.8em;
    max-height:80vh;
    min-height:80vh;
    overflow: auto;
    padding: 15px;
}
.mytablePhone {
     width: 98%;
     margin: 0 auto;
     margin-top: 10vh;
    font-size:0.4em;
    max-height:80vh;
    overflow: auto;
}

</style>