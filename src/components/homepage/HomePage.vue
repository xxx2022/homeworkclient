<template>
    <div style="background: white;height:100vh;width:100%">
        <!-- 导航栏 -->
        <div class="myheader">
            <div :class="[this._isMobile() ? 'mycenterphone' : 'mycenter']">
                <ul>
                    <router-link  style=" color: #fff;" to="/homepage/userpage" ><li class="menuli" :class="{licheck: ischeck===1}" @click="check(1)" >提交作业</li></router-link>
                    <router-link v-if="this.$store.state.userinfo.power"   style=" color: #fff;" to="/homepage/adminpage" ><li class="menuli" :class="{licheck: ischeck===2}" @click="check(2)" > 管理界面</li></router-link>
                     <el-dropdown style="float:right;color:#fff" :hide-on-click="false">
                        <!-- <span class="el-dropdown-link">
                            欢迎{{this.$store.state.userinfo.name}}
                        </span> -->
                        
                        <el-tooltip class="item" effect="dark" :content="className" placement="left">
                            <el-button type="primary" style="color: #FFF;background-color: #607D8B;border-color: #9e9e9e69;padding:10px 4px" class="welbtn">
                                <p>欢迎{{this.$store.state.userinfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></p>
                            </el-button>
                        </el-tooltip>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item   style="margin-right: 0"><el-button style="border:0" @click="changeshowaddclassdisalog()">添加班级</el-button></el-dropdown-item>
                            <el-dropdown-item   divided><el-button style="border:0" @click="changeshowcreateclassdisalog()">创建班级</el-button></el-dropdown-item>
                            <el-dropdown-item   divided><el-button style="border:0" ><router-link  to="/login" >退出登录</router-link></el-button></el-dropdown-item>
                        </el-dropdown-menu>
                     </el-dropdown>
                </ul>
               
            </div>
        </div>
        <!-- <router-link to="/homepage/userpage" > 普通用户界面</router-link><router-link to="/homepage/adminpage" > 管理员界面</router-link> -->

        <router-view></router-view>

        <!-- 添加班级的弹框 -->
        <div v-show="showaddclassdisalog" style="background:rgba(208,208,208,0.6);width:100%;height:100vh;position:fixed;top:0;z-index:2021">
            <div :class="[this._isMobile() ? 'addClassDialogPhone' : 'addClassDialog']">
                <span style="float:right;margin-right:1%;margin-top:5px"><el-button @click="changeshowaddclassdisalog()" style="border:0;font-size:20px"  icon="el-icon-circle-close" ></el-button></span>
                <div style="font-size:1.1em;margin-top:3vh;margin-bottom:8vh;">添加班级</div>
                <div>
                    班级号 <el-input placeholder="请输入班级号" v-model="classId" maxlength="50" style="width:80%"></el-input>
                </div>
                <!-- !!!!!!!!弹框这里修改了 -->
                <div style="float:right;margin-top:6%;margin-right:4%">  
                    <el-button @click="joinclass" type="primary">确认添加</el-button><el-button @click="changeshowaddclassdisalog()" type="warning">取消</el-button>
                </div> 
            </div>
        </div>

        <!-- 创建班级的弹框 -->
        <div v-show="showcreateclassdisalog" style="background:rgba(208,208,208,0.6);width:100%;height:100vh;position:fixed;top:0;z-index:2021">
            <div :class="[this._isMobile() ? 'addClassDialogPhone' : 'addClassDialog']">
                <span style="float:right;margin-right:1%;margin-top:5px"><el-button @click="changeshowcreateclassdisalog()" style="border:0;font-size:20px"  icon="el-icon-circle-close" ></el-button></span>
                <div style="font-size:1.1em;margin-top:3vh;margin-bottom:6vh;">创建班级</div>
                 <div>
                    班级名 <el-input placeholder="请输入班级名" v-model="className" maxlength="50" style="width:78%"></el-input>
                </div><br/>
                <div>
                    班级号 <el-input placeholder="请输入班级号" v-model="classId" maxlength="50" style="width:78%"></el-input>
                </div>
                <div style="float:right;margin-top:4%;margin-right:4%">
                    <el-button @click="creteclasses()" type="primary">确认创建</el-button><el-button @click="changeshowcreateclassdisalog()" type="warning">取消</el-button>
                </div> 
            </div>
        </div>


    </div>
</template>
<script>
export default {
    data() {
        return {
          ischeck:1, 
          classId:null, 
          className:null,
          showaddclassdisalog:false, //控制显示添加班级的弹框
          showcreateclassdisalog:false, //控制显示创建班级的弹框
          className:'',
        }
    },
    
    mounted(){
        //检查url判断是提交作业界面还是管理界面
       // console.log(this.$root._route.path.indexOf("adminpage"))
        if(this.$root._route.path.indexOf("adminpage") !=-1){
            this.ischeck = 2;
        }
        this.getClassName();
    },
    methods:{
        getClassName(){
             this.axios({  
                method:"post",
                url:"/getClassName",
                data:this.qs.stringify({classId:this.$store.state.userinfo.classId}),
                })
                .then(res =>{
                    console.log(res);
                    if(res.data.code===200){
                        this.className = res.data.data;
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
        },
        check(check){   //选中菜单的样式改变
            this.ischeck = check;
        },
         _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        //显示添加班级的弹框
        changeshowaddclassdisalog(){
            this.showaddclassdisalog = !this.showaddclassdisalog;
            this.classId = null;
        },
        //显示创建班级的弹框
        changeshowcreateclassdisalog(){
            this.showcreateclassdisalog = !this.showcreateclassdisalog;
            this.classId = null;
        },
        //添加班级
        joinclass(){
            
             if(!this.classId){
                this.$message("请填写完整");
                return
            }
            this.axios({  
                method:"post",
                url:"/joinclass",
                data:this.qs.stringify({username:this.$store.state.userinfo.username,classId:this.classId}), 
                })
            .then(res =>{
                console.log(res.data);
                let classId = this.classId;
                //this.classId = '';  //清空输入框
                if(res.data.code === 200){  //添加成功
                     this.$message(res.data.data);
                   
                    this.changeshowaddclassdisalog(); //关闭弹框
                    this.$store.dispatch("setUserClassIdFun",classId); //保存新的班级
                    this.$store.dispatch("setUserPowerdFun",0); //保存新的权限
                    location.reload();
                    // this.$router.push({path:'/homepage'});
                    // this.$router.go(0);
                    // console.log(classId)
                    // console.log(this.$store.state.userinfo);
                    //重新登录
                    //this.$router.push({path:'/login'})
                }
                else
                    this.$message(res.data.data);
            })
            .catch(err =>{
                console.log(err);
            })  
        },
        //创建班级
        creteclasses(){
            if(!this.className | !this.className){
                this.$message("请填写完整");
                return
            }
            this.axios({  
                method:"post",
                url:"/createclasses",
                data:this.qs.stringify({username:this.$store.state.userinfo.username,className:this.className,classId:this.classId}),
                })
            .then(res =>{
                console.log(res.data);
                let classId = this.classId;
                if(res.data.code === 200){  //添加成功
                    this.$message(res.data.data);
                    this.changeshowcreateclassdisalog(); //关闭弹框
                    this.$store.dispatch("setUserClassIdFun",classId); //保存班级号
                    this.$store.dispatch("setUserPowerdFun",1); //保存新的权限
                    console.log('------')
                    console.log(this.$store.state.userinfo);
                    this.classId = this.className = '';  //清空输入框
                    // this.$router.go(0);
                    //  console.log(this.$children[0].click())
                    //重新登录
                   // this.$router.push({path:'/login'})
                }
                else
                    this.$message(res.data.data);
            })
            .catch(err =>{
                console.log(err);
            })  
        },

    },
//     watch: {
//         '$route'(to,from){
//             console.log(to);   //to表示去往的界面
//             console.log(from); //from表示来自于哪个界面
//             if(to.name==="userpage"){
//                 this.ischeck = 1;
//             }
//             else if(to.name === "adminpage/work"){
//                 this.ischeck = 2;
//             }
//     }
//   },

   
}
</script>
<style scope>
/* 导航栏 */
/* body {
  background: white;
} */
.myheader {
    width: 100%;
    background-color: #567476;
    height: 7vh;
    font-family: "楷体";
    color: #fff;

}
.mycenter {
    
    width: 80%;
    margin: 0 auto;
    text-align: left;
    line-height: 7vh;

}
.mycenterphone {

    width: 98%;
    margin: 0 auto;
    text-align: left;
    line-height: 7vh;
}
ul {
    margin: 0;
    padding: 0;
}
.menuli {
    list-style: none;
    display: inline;
    font-size: 1.3em; 
}
.menuli:hover {
    color:cornflowerblue;
    /* background-color: chocolate; */
}
.licheck {
    font-size: 1.3em;
    color:chartreuse
}
li:nth-child(1) {
    margin-right: 2%;
}
/* 添加班级的弹框 */
.addClassDialog {
    width: 25%;
    margin: 0 auto;
    background-color: #FFF;
    position: fixed;
    top: 25vh;
    height: 35vh;
    right: 0;
    bottom: 40vh;
    left: 0;
    overflow: auto;
    z-index: 2020;
    border-radius: 6px;
     opacity:1;
     font-weight: 700;
     font-family: "宋体";
     text-align: left;
     padding: 10px;
}
.addClassDialogPhone {
    width: 98%;
    
    margin: 0 auto;
    background-color: #FFF;
    position: fixed;
    /* !!!!!!!!弹框这里修改了 */
     top: 5vh;
    height: 95vh;       
    right: 0;
    /* bottom: 40vh; */
    left: 0;
    overflow: auto;
    z-index: 2020;
    border-radius: 6px;
     opacity:1;
     font-weight: 700;
     font-family: "宋体";
      text-align: left;
     padding-left: 1%;
}
.welbtn {
    color: #FFF;
    background-color: #607D8B;
    border-color: #9e9e9e69;
    padding:10px 4px
}
/* .el-button--primary {
    color: #FFF;
    background-color: #607D8B;
    border-color: #9e9e9e69;
    width: 90px;
    height: 30px;
    margin-top: 10px;
}
.el-button--primary p{
  margin-left: -12px;
  margin-top: -4px;
} */
</style>