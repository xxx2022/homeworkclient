<template>
<div style="width:100%">
<div v-show="showdetailhomework" style="background:rgba(208,208,208,0.6);width:100%;height:100vh;position:fixed;top:0;left:0">
    <div :class="[this._isMobile() ? 'mytablePhone' : 'mytable']">
        <h3 style="display: block;float:left;">{{this.$route.query.course}} </br> <a style="font-weight:500;font-size:13px;color:#555">{{this.$route.query.context}}</a></h3>
        <div style="float:right;margin-right:1%;">
             <el-button v-if="classes" style="padding:4px;border:0;" size="mini" type="primary" plain @click.native.prevent="classes=0"> 
             所有学生
            </el-button>
             <el-button v-else style="padding:4px;border:0; " size="mini" type="primary" plain @click.native.prevent="classes=1;"> 
             未提交
            </el-button>
            <span ><el-button @click="close()" style="padding:10px;border:0;font-size:18px"  icon="el-icon-circle-close" ></el-button></span>
             
        </div>
       <el-table
        :data="datalist.filter(user => !classes ||user.finished===0)"
        stripe
        v-loading="loading"
        
        :show-overflow-tooltip="true"
        >
        <!-- <el-table-column
            :show-overflow-tooltip="true"
            prop="workid"
            label="作业ID"
           >
           {{workid}}
        </el-table-column> -->

        <el-table-column
            :show-overflow-tooltip="true"
            prop="username"
            label="学号"
        
           >
        </el-table-column>
        <el-table-column
            :show-overflow-tooltip="true"
            prop="name"
            label="姓名"
        
           >
        </el-table-column>
        <el-table-column prop="finished" label="提交状态" show-overflow-tooltip
          :formatter="formtype">
    
        </el-table-column>

        <el-table-column
            prop="time"
            label="提交时间"
            min-width="92px">
        </el-table-column>
        <!-- <el-table-column
            prop="url"
            label="下载路径">
        </el-table-column> -->
        <el-table-column  prop="url" label="操作"> 
            <template slot="header">
                <el-button style="padding:2px;border:0 "  size="mini" type="primary" plain @click.native.prevent="downloadAllworks()"> 
                全部下载 
                </el-button>
            </template>
            <template  slot-scope="scope">
                <el-button style="border:0"  @click.native.prevent="downloadAFile(scope.row.url)" v-show="scope.row.url!=null" size="small" type="primary" plain> 
                    下载  
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <router-view></router-view>
    </div>
</div>
</div>
</template>


<script scoped>
import Vue from 'vue'
export default {
    data(){
        return{
            loading:true,
            classes:null, //显示学生的类别 提交 全部 未提交
            showdetailhomework:true,
            workid: this.$route.query.id ,
            // datalist:[{
            //     workid: this.$route.query.id ,
            //     course: '',
            //     classId: '',
            //     username: '',
            //     name: '',
            //     finished: '',
            //     time: '',
            //     url: ''
            // }],   
            datalist:[],
        }
    },
     created(){
        this.getAHomeworkUser()
    },
     props:['data.id'],
    methods: {
        getAHomeworkUser(){         //查询一个作业的完成情况
            this.axios({  
                method:"post",
                url:"/selectAllWorkUser",
                data:this.qs.stringify({homeworkId: this.$route.query.id,username:this.$store.state.userinfo.username}), 
                })
            .then(res =>{
                console.log(res.data.data);
                this.datalist=res.data.data;
                this.loading = false;
                //return datalist;
            })
            .catch(err =>{
                console.log(err);
            })   
        },
        downloadAFile(downloadUrl){
            console.log(downloadUrl)
            if(downloadUrl!=null){
                window.open("http://122.51.65.4:5000/downloadAFile?url="+downloadUrl.replace(/\\/g,"/"),"_blank");      
            }
            else{
                console.log("还未提交作业！")
            }
           
        },               //下载所有文件
        downloadAllworks(){
            this.axios.get("/downloadZip",{params:{homeworkId: this.$route.query.id}})
            .then(res =>{
                console.log(res.data);
                if(res.data.code === 200){
                    //res.data.data 为返回的url
                    console.log(res.data.data);
                    window.open("http://122.51.65.4:5000/downloadAFile?url="+res.data.data.replace(/\\/g,"/"), "_blank");
                }
                else{
                    this.$message("下载失败");
                }
            })
            .catch(err =>{
                console.log(err);
            })
        },
       //判断线路类型，返回对应文字
        formtype(row, column, cellValue){
           if (cellValue == 1){
                return '已提交';
            }else if (cellValue == 0){
                return '待提交';
            }
         },
       
        _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        close(){
            this.showdetailhomework= !this.showdetailhomework;
            this.$router.push({path:'./'});
        }

      }
    
}
var bus=new Vue();
</script>
<style scoped>
/* 手机端样式 */

.mytable {
    
    width: 50%;
    padding: 10px;
    margin: 0 auto;
    margin-top: 10vh;
    font-size:0.8em;
    max-height:80vh;
    min-height:80vh;
    overflow: auto;
    background-color: #fff;
}
.mytablePhone {
     width: 98%;
     margin: 0 auto;
     margin-top: 5vh;
    font-size:0.4em;
    max-height:95vh;
    overflow: auto;
    background-color: #fff;
}

</style>