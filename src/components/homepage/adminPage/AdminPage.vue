<template>
    <div>
        <!-- 管理员界面<br/> -->
        <div style="width:80%;margin:0 auto;text-align:right">
            </br>
             <el-button  @click="addHomeworkShow = !addHomeworkShow">发布作业</el-button>
             <el-button @click="changeAllUsersShow">班级成员</el-button>
        </div>

        <div>
                <!-- ref用来父组件调用子组件的方法 -->
            <!-- <allworks style="z-index: 2000;" ref="allworks"></allworks>  -->
            <router-view ref="allworks"></router-view>
            <!--显示发布作业的组件 v-if控制子组件的显示 @changeAddHomwworkShow监听子组件的方法 -->
           <addHomwwork  v-if="addHomeworkShow" @uqdateAllWork="uqdateAllWork" @changeAddHomwworkShow="changeAddHomwworkShow"></addHomwwork> 
            <!--显示班级所有学生的组件 v-if控制子组件的显示 @changeAddHomwworkShow监听子组件的方法 -->
            <allusers v-if="allUSersShow" @changeAllUsersShow="changeAllUsersShow" ></allusers>
            
            
            
        </div>
    </div>
</template>
<script>
import addHomwwork from "./Addhomework"
import allusers from "./AllUsersShow"
import allworks from "./AllWorks"

export default {
    components:{addHomwwork,allusers,allworks},
    data() {
        return {
            addHomeworkShow:false,
           
            allUSersShow:false,
        }
    },
    methods:{
        changeAddHomwworkShow(){ //改显示添加作业的弹框
           // console.log("父组件的方法")
            this.addHomeworkShow = !this.addHomeworkShow;
        }, 
        // changeAlterHomeworkShow(){
        //     this.alterHomeworkShow = !this.alterHomeworkShow;
        // },
        changeAllUsersShow(){   //显示班级所有用户的弹框
            this.allUSersShow = !this.allUSersShow;
        },
       uqdateAllWork(){
           this.$refs.allworks.getAllHomework();
       }
    }
}
</script>