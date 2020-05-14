<template><!--显示所有的作业列表 -->
    <div  :class="[this._isMobile() ? 'containerPhone' : 'containerPc']">
       <el-table
        :data="datalist"
        stripe
        :show-overflow-tooltip="true"
        >
        <!-- <el-table-column
            :show-overflow-tooltip="true"
            prop="id"
            label="作业ID"
        
           >
        </el-table-column> -->
        <el-table-column
            :show-overflow-tooltip="true"
            prop="course"
            label="课程名称"
           >
        </el-table-column>
        <el-table-column
            prop="context"
            label="作业描述"
            >
        </el-table-column>
         <el-table-column
            prop="startTime"
            label="发布时间">
        </el-table-column>
        <el-table-column
            prop="endTime"
            label="截止时间">
        </el-table-column>
        <!-- <el-table-column
            prop="isok"
            label="状态"
            :formatter="formtype" width="70px">
        </el-table-column> -->
        <el-table-column  label="操作" width="290px">
            <template slot-scope="scope">
                <router-link :to="{name: 'detail',query:{course:scope.row.course, context:  scope.row.context ,id: scope.row.id}}">
                    <el-button style="border:0">
                        查看详情
                    </el-button>
                </router-link>

                <router-link :to="{name: 'alterhomework',query:{id: scope.row.id}}">
                    <el-button style="border:0">
                        编辑
                    </el-button>
                </router-link>

                
                    <el-popconfirm
                        confirmButtonText='是的'
                        cancelButtonText='不了'
                        @onConfirm="deleteHomework(scope.row.id)"
                        icon="el-icon-info"
                        iconColor="red"
                        title="真的要删除该作业吗？"
                        >
                    <el-button
                        v-if="!scope.row.power"
                        style="border:0"
                        slot="reference">
                        删除
                    </el-button>
                    </el-popconfirm>
                    <!-- @click.native.prevent="deleteHomework(scope.row.id)" -->
            </template>
        </el-table-column>
    </el-table>
    <router-view></router-view>
</div>


</template>


<script scoped>
export default {
    data(){
        return{
            
             datalist:[],
        }
    },
    mounted(){
        this.getAllHomework()
    },
    methods:{
         _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        getAllHomework(){
            this.axios({  
                method:"post",
                url:"/getAllHomework",
                data:this.qs.stringify({classId:this.$store.state.userinfo.classId,username:this.$store.state.userinfo.username})
                }).then(res =>{
                    console.log(res.data);
                    // this.$store.dispatch("setUserInfoFun",res.data.data); //保存登录信息
                    // console.log("保存在vuex中的homework信息为：");
                    // console.log(this.$store.state.userinfo);
                    console.log("datalist信息为：");
                    this.datalist=res.data.data;
                    console.log(this.datalist);
                    return this.datalist;
            }).catch(err =>{
                console.log(err);
            }) 
        },
        deleteHomework(id){
            this.axios({  
                method:"post",
                url:"/deleteHomework",
                data:this.qs.stringify({homeworkId:id, username:this.$store.state.userinfo.username}), 
                })
            .then(res =>{
                console.log(res.data);
                 if(res.data.code === 200){  //删除成功
                   this.getAllHomework(); 
                }
                this.$message(res.data.data);
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
        uqdateAllWork(){ //用于添加作业后刷新作业列表，添加作业和显示作业是兄弟组件 addHomwwork->这个父组件->allworks的方法
            this.getAllHomework();
        },
        formtype(row, column, cellValue){
           if (cellValue == 0){
                return '已失效';
            }
        },
    }
}
</script>

<style scope>
.containerPc {
    width: 80%;
    margin: 0 auto;
    z-index: 0;
}
.containerpPhone {
    width: 98%;
    margin: 0 auto;
}

</style>