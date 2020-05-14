<template>
  <div>
    <header :class="[this._isMobile() ? 'headerPhone' : 'header']">
      <!-- 选择作业状态 -->
      <el-select v-model="value" placeholder="请选择" @change="getDontStudentList">
        <el-option value="全部作业"></el-option>
        <el-option value="未完成作业" ></el-option>
        <el-option value="已失效作业"></el-option>
      </el-select>
      <!-- 选择作业状态 -->
    </header>
    <main :class="[this._isMobile() ? 'mainPhone' : 'main']">
      <!-- 查看所有作业 -->
      <el-table  :data="homeWorkData" v-loading="loading" style="width: 100%;min-height:60vh">
        <!-- <el-table-column prop="classId" label="班级号" ></el-table-column> -->
        <el-table-column prop="course" label="课程名称"></el-table-column>
        <el-table-column prop="context" label="作业描述" ></el-table-column>
        <el-table-column  min-width="92px" prop="startTime" label="发布时间"></el-table-column>
        <el-table-column  min-width="92px" prop="endTime" label="截止时间"></el-table-column>
        <el-table-column v-if="value!='未完成作业'" prop="finished" label="完成情况">
          <template slot-scope="scope">
           {{isfinish(scope.row.finished)}}
          </template>
          </el-table-column>
        <el-table-column v-if="value==='全部作业'"  label="是否过期">
          <template slot-scope="scope">
          {{isok(scope.row.isok)}}
          </template>
          </el-table-column>
        <!-- <el-table-column prop="id" label="作业ID"></el-table-column> -->
         <el-table-column v-if="value === '未完成作业'" label="操作" >
          <template slot-scope="scope">
            <el-button
              type="text"
              ref="claerFile"
              @click="openDialog(scope.row)"
              multiple="multiple"
            >提交作业</el-button>
          </template>
        </el-table-column>
      </el-table>
       
      <el-dialog :width="submitDialogWidth" title="提交作业" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :limit="1"
              :on-change="getFile"
             
            >
              <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button  size="small" type="primary" @click="submitStudentHomework">确 定</el-button>
        </div>
        <!-- 提交作业 -->
      </el-dialog>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,  //显示加载
      submitDialogWidth:null, //提交作业弹框的宽度
      userinfo: "",
      homeWorkData: [],
      file: [],
      // 提交弹框
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 提交弹框
      // 选择作业状态
      value: "未完成作业",
      fileinfo: {id:'',filename:''}

      // 选择作业状态
    };
  },

  created() {
    this.getDontStudentList();
    this.submitDialogWidth = this._isMobile() ? '100%' : '50%';
  },
  methods: {
    _isMobile() { //判断是手机还是PC
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
      },
    //提交作业
    openDialog(row){
      this.dialogFormVisible = true
      console.log(row)
      this.fileinfo.id=row.id
      this.fileinfo.filename=row.filenameFormat.replace(/学号/,this.$store.state.userinfo.username).replace(/姓名/,this.$store.state.userinfo.name)
      // this.fileinfo.filename
     console.log( row.filenameFormat.replace(/学号/,this.$store.state.userinfo.username).replace(/姓名/,this.$store.state.userinfo.name))
      
    },
    getFile(file) {
      this.file = file.raw;
      console.log(this.file)
    },
    submitStudentHomework() {
      this.dialogFormVisible = false;
      if (!this.file) {
        alert("请选择文件");
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("username", this.userinfo.username);
      formData.append("homeworkId", this.fileinfo.id);
      formData.append("filename", this.fileinfo.filename);
      this.axios({
        method: "post",
        url: "/submit",
        data: formData,
        })
        .then(res =>{
          console.log(res.data);
          if(res.data.code === 200){
            this.file = null;
            this.$refs.upload.clearFiles();
            this.getDontStudentList();
            this.dialogFormVisible = false;
          }
          this.$message(res.data.data);
        })
        .catch(err =>{
          console.log(err);
        })
    },
    //全部作业
    getDontStudentList(value) {
      this.homeWorkData = [];
      if(!value) value="未完成作业"
      // console.log(value);
      this.userinfo = this.$store.state.userinfo;
      if (value === "全部作业") {
         console.log("全部作业");
        this.axios.post("/getAUserHomework",this.qs.stringify({ username: this.userinfo.username, classId: this.userinfo.classId }))
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.homeWorkData = res.data.data;
              this.loading = false;
            } else {
              this.$message("获取列表失败");
            }
          });
      } else if(value==="未完成作业"){
        console.log("获取未完成作业");
        this.axios.post("/getAUserDontSubmitHomework",this.qs.stringify({ username: this.userinfo.username, classId: this.userinfo.classId }))
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.homeWorkData = res.data.data;
            this.loading = false;
          } else {
            this.$message("获取列表失败");
          }
        });
        } if(value==="已失效作业"){
           console.log("已失效作业");
          this.userinfo = this.$store.state.userinfo;
          this.axios.post("/getAUserDontIsOkSubmitHomework",this.qs.stringify({ username: this.userinfo.username, classId: this.userinfo.classId }))
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.homeWorkData = res.data.data;
                this.loading = false;
              } else {
                this.$message("获取列表失败");
              }
            });
        }
    },
    isok(isok){
      // console.log(isok);
            if(isok)
                return "可提交";
            else
                return "已失效"
    },
    isfinish(isfinish){
      console.log(isfinish)
      return isfinish ? "已完成" : "未提交";
    },
 },
// watch: {
//   'homeWorkData': {
//     handler(homeWorkData) {

//     },
//     immediate: true,
//     // deep: true
//   }
// }
};
</script>
<style>
.headerPhone{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
header input {
  background-color: pink;
}
.mainPhone {
  width: 100%;
  /* height: 200px; */
  /* background-color: plum; */
  margin: 0 auto;
  text-align: left;
  background-color: #eaedf1;
}
main {
  width: 80%;
  /* height: 200px; */
  /* background-color: plum; */
  margin: 0 auto;
  text-align: left;
  background-color: #eaedf1;
}
.search {
  margin-left: 10px;
  padding-top: 10px;
}
/* .el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3) !important;
  width: 100%;
} */
</style>