<template>
    <div>
        用户界面
        {{this.$store.state.userinfo.username}}
        <!-- <div><el-button>添加班级</el-button><el-button>新建班级</el-button></div> -->
        <ul>
            <li  v-for="work in workLists" :key="work.id">{{work.context}}&nbsp;&nbsp;{{work.course}}&nbsp;&nbsp;{{work.endTime}}<el-button >提交</el-button>  </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userinfo:'',
            workLists:[],

        }
    },
    created(){
        this.getWorkList();
    },
    methods:{
        getWorkList(){
            this.userinfo = this.$store.state.userinfo;
            console.log(this.userinfo.username === "")
            // if(this.userinfo.username === "")
            //  return ;
            this.axios.post('/getAUserHomework',this.qs.stringify({username:this.$store.state.userinfo.username,classId:this.$store.state.userinfo.classId}))
            .then(res =>{
                console.log(res);
                if(res.data.code === 200){
                    this.workLists = res.data.data;
                }
                else{
                    this.$message("获取作业列表失败");
                }
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
}
</script>