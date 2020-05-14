<template>
    <div style="width:100%">
        <div v-show="showalterhomework" style="background:rgba(208,208,208,0.6);width:100%;height:100vh;position:fixed;top:0;left:0">
            <div :class="[this._isMobile() ? 'alterWorkDialogPhone' : 'alterWorkDialog']">
                <span style="float:right;margin-right:1%;margin-top:5px"><el-button @click="close()" style="border:0;font-size:20px"  icon="el-icon-circle-close" ></el-button></span>
                <!-- <div style="font-size:1.1em;margin-top:3vh;margin-bottom:3vh;">修改作业ID: {{this.$route.query.id}}</div> -->
                <div style="font-size:1.1em;margin-top:3vh;margin-bottom:3vh;">修改作业</div>
                 <div>
                    课程名称 <el-input placeholder="请输入课程名称" v-model="alterhomework.course" maxlength="50" style="width:70%"></el-input>
                </div><br/>
                <div>
                    作业描述 <el-input placeholder="请输入作业描述"  v-model="alterhomework.context" maxlength="50" style="width:70%"></el-input>
                </div><br/>
                 <div>
                    命名格式 <el-input placeholder="请输入命名格式" v-model="alterhomework.filenameFormat" style="width:70%"></el-input>
                </div><br/>
                <div>
                    结束时间 
                    
                    <el-date-picker
                        v-model="alterhomework.endTime"
                        type="datetime"
                        style="width:70%"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>

                </div>
                <div style="position: absolute; bottom: 4%;right:4%">
                    <el-button @click="alterHomework" type="primary">确认</el-button><el-button @click="close()" type="warning">取消</el-button>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            showalterhomework: true, 
            dialogFormVisiblek: true,
            // beforehomework:{
            //     course:'',
            //     context:'',
            //     filenameFormat:'',
            //     endTime: "",
            //     // classId:'',
            // },
            alterhomework:{
                id: this.$route.query.id ,
                course: '',
                context: '',
                filenameFormat: '',
                endTime: "2020-04-29 14:45:08",
                // classId:'',
            },
            formLabelWidth: '20%'
        }

    },
    created(){
        this.getAHomework();
    },
    methods:{
        getAHomework(){
            this.axios({  
                method:"post",
                url:"/getAHomework",
                data:this.qs.stringify({homeworkId: this.$route.query.id,username: this.$store.state.userinfo.username}), 
                })
            .then(res =>{
                console.log(res.data);
                this.alterhomework=res.data.data;
                console.log(this.alterhomework)
                // return this.alterhomework;
            })
            .catch(err =>{
                console.log(err);
            }) 
        },
         alterHomework(){
            //  console.log("-----")
            //   console.log(this.alterhomework)
            //  for(let value in this.alterhomework){    //检查是否填写完整
            //     console.log(this.alterhomework[value])
            //     if(!this.alterhomework[value]){
            //         this.$message("请填写完整");
            //          return;
            //     }  
            // }
            if( !this.alterhomework.course ||!this.alterhomework.context ||!this.alterhomework.filenameFormat ||!this.alterhomework.endTime){
                    this.$message("请填写完整");
                     return;
            }
            this.axios({  
                method:"post",
               
                url:"/alterHomework/"+this.$store.state.userinfo.username,
                data:this.alterhomework, 
                
                })
            .then(res =>{
                console.log(res.data);
                 if(res.data.code === 200){ //修改成功
                    // this.$message(res.data.data.message)
                    this.$parent.getAllHomework();  //调用父组件的方法 去 调用显示作业的组件 更新作业列表
                    this.homework = null;   //清空填写的发布作业的值
                    this.showalterhomework= !this.showalterhomework;
                    this.close();  
                }
                this.$message(res.data.data)
            })
            .catch(err =>{
                console.log(err);
            }) 
        },
         dateChange(dt){     
            return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0') +
                   ' ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
        },
        // close(){ //这个弹框关闭的回调
        //     //console.log("关闭");
        //     this.changeshowaddhomework     //调用父组件的方法关闭发布作业的弹框
        // },
        check(check){   //选中菜单的样式改变
            this.ischeck = check;
        },
         _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        close(){
            this.showalterhomework= !this.showalterhomework;
            this.$router.push({path:'./'});
        }
    }
}
</script>

<style scope>
/* 手机端样式 */
.alterWorkDialogPhone {
    width: 98%;
    margin: 0 auto;
    background-color: #FFF;
    position: fixed;
    top: 5vh;
    height: 95vh;
    right: 0;
    /* bottom:20vh; */
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
/* PC端样式 */
.alterWorkDialog {
    width: 40%;
    margin: 0 auto;
    background-color: #FFF;
    position: fixed;
    top: 15vh;
    height: 70vh;
    right: 0;
    /* bottom: 20vh; */
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
</style>