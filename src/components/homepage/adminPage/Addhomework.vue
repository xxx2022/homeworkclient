<template>
    <div style="width:100%"><!--添加作业的弹框 -->
        <div v-on:click="hidePanel" v-show="true" style="background:rgba(208,208,208,0.8);width:100%;height:100vh;position:fixed;top:0;">
            <div id="myPanel" :class="[this._isMobile() ? 'addWorkDialogPhone' : 'addWorkDialog']">
                <span style="float:right;margin-right:1%;margin-top:5px"><el-button @click="close()" style="border:0;font-size:20px"  icon="el-icon-circle-close" ></el-button></span>
                <div style="font-size:1.1em;margin-top:3vh;margin-bottom:4vh;">添加作业</div>
                 <div>
                    课程名称 <el-input placeholder="请输入课程名称" v-model="homework.course" maxlength="50" style="width:70%"></el-input>
                </div><br/>
                <div>
                    作业描述 <el-input placeholder="请输入作业描述"  v-model="homework.context" maxlength="50" style="width:70%"></el-input>
                </div><br/>
                 <div>
                     
                    命名格式 <el-input placeholder="如：学号姓名实验一" v-model="homework.filenameFormat" style="width:70%"></el-input>
                </div><br/>
                <div>
                    结束时间 
                    
                    <el-date-picker
                        v-model="homework.endTime"
                        type="datetime"
                        style="width:70%"
                        placeholder="选择日期时间">
                    </el-date-picker>

                </div>
                <!-- <div style="position: absolute; bottom: 4%;right:4%"> -->
                 <div style="position: absolute; bottom: 4%;right:4%">
                   <el-button size="small" @click="close()" type="warning">取消</el-button> <el-button size="small" type="primary" @click="addhomework()">确 定</el-button>
                </div> 
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogFormVisible: true,
            homework:{
                course:'',
                context:'',
                filenameFormat:'',
                endTime: '',
                classId:'',
            },
            formLabelWidth: '20%'
        }
    },
    methods:{
        addhomework(){
            this.homework.classId = this.$store.state.userinfo.classId;  //获取发布者所在班级号
            for(let value in this.homework){    //检查是否填写完整
                if(!this.homework[value]){
                    this.$message("请填写完整");
                     return;
                }  
            }
            console.log(this.homework);
            this.homework.endTime = this.dateChange(this.homework.endTime)  //截止时间格式转换
            console.log(this.homework);
            this.axios({  
                method:"post",
                withCredentials: true,
                url:"/addHome/"+this.$store.state.userinfo.username,
                data:this.homework, 
                })
            .then(res =>{
                console.log(res);
                if(res.data.code === 200){ //添加成功
                   // this.$message(res.data.data.message)
                    this.$emit("changeAddHomwworkShow");     //调用父组件的方法 关闭发布作业的弹框
                    this.$emit("uqdateAllWork");  //调用父组件的方法 去 调用显示作业的组件 更新作业列表
                    this.homework = null;   //清空填写的发布作业的值
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
        close(){ //这个弹框关闭的回调
            //console.log("关闭");
            this.$emit("changeAddHomwworkShow");     //调用父组件的方法关闭发布作业的弹框
        },
        _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        hidePanel(event){
            let sp = document.getElementById("myPanel");
            if(sp && !sp.contains(event.target)){
                     this.close();
                }
            }
        
    },
    
}
</script>
<style scope>
/* 手机端样式 */
.addWorkDialogPhone {
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
.addWorkDialog {
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