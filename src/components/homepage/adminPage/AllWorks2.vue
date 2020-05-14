<template><!--显示所有的作业列表 -->
    <div  :class="[this._isMobile() ? 'containerPhone' : 'containerPc']">
        <!-- :data="workLists.filter(work =>  !work.isdelete )"     -->
       <el-table
        :data="workLists.filter(work =>  !work.isdelete )"
        stripe
        :show-overflow-tooltip="true"
        >
        <el-table-column
            :show-overflow-tooltip="true"
            prop="course"
            label="科目"
           >
        </el-table-column>
        <el-table-column
            prop="context"
            label="详细"
            >
        </el-table-column>
         <el-table-column
        
            prop="startTime"
            label="开始时间">
        </el-table-column>
        <el-table-column
            prop="endTime"
            label="截止时间">
        </el-table-column>
        <el-table-column  label="操作">
            <template slot-scope="scope">
                <el-button
                    v-if="!scope.row.power"
                    type="info"
                    @click.native.prevent="deleteWork(scope.row.id)"  
                    size="mini">
                    删除
                </el-button>
                <el-button
                    type="warning"
                    @click.native.prevent="alterWork(scope.row.id)"
                     size="mini">
                    修改
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        workLists: []
      }
    },
    mounted(){
      // this.getAUserDontSubmitHomework();
        this.getAllHomework();
    },
    methods:{
         _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        //获取一个同学的待完成作业的接口
         getAUserDontSubmitHomework(){
             console.log("sdfsdf");
            this.axios({  
                method:"post",
                url:"http://127.0.0.1:5000/getAUserDontSubmitHomework",
                data:this.qs.stringify({username:180706031,classId:1234567}), 
                })
            .then(res =>{
                console.log(res.data);
            })
            .catch(err =>{
                console.log(err);
            }) 
        },
        getAllHomework(){   //获取所有的作业
           this.axios({  
                method:"post",
                url:"/getAllHomework",
                data:this.qs.stringify({classId:this.$store.state.userinfo.classId,username:this.$store.state.userinfo.username}), 
                })
            .then(res =>{
                console.log(res.data);
                if(res.data.code === 200){
                    this.workLists = res.data.data;
                }
            })
            .catch(err =>{
                console.log(err);
            }) 
        },
        deleteWork(workId){   //删除作业
             this.axios({  
                method:"post",
                url:"/deleteHomework",
                data:this.qs.stringify({homeworkId:workId,username:this.$store.state.userinfo.username}), 
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
        }
    }
  }
</script>
<style scoped>
.containerPc {
    width: 80%;
    margin: 0 auto;
}
.containerpPhone {
    width: 98%;
    margin: 0 auto;
    font-size: 10px;
}
</style>