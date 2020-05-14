<template>
  <div>
    <!-- PC端 -->
    <div class="space" v-if="!isphone">
       <!-- 背景部分 -->
      <div class="stars" id="stars"></div>
      <div class="stars2" id="stars2"></div>

      <div class="solar-syst ">
        <div class="sun" style="margin-left: -245px;"></div>
      <div class="mercury" style="margin-left: -263px;"></div>
      <div class="venus" style="margin-left: -278px;"></div>
      <div class="earth" style="margin-left: -300px;"></div>
      <div class="mars" style="margin-left: -323px;"></div>
      <div class="jupiter" style="margin-left: -398px;"></div>
      <div class="saturn" style="margin-left: -445px;"></div>
      <div class="uranus" style="margin-left: -485px;"></div>
      <div class="neptune" style="margin-left: -540px;"></div>
      <div class="pluto" style="margin-left: -620px;"></div>
      <div class="asteroids-belt" style="margin-left: -374px;"></div>
        <div class="input" style="border: none;margin-left: 250px;">
        <input placeholder="学号" type="text" style="margin-top: -150px;" v-model="user.username" />
         <input placeholder="姓名" type="text" v-model="user.name" />
        <input placeholder="密码" type="password" v-model="user.password" show-password/>
        
        <!-- <input placeholder="姓名" type="text" class="input-name" v-model="user.name" /> -->
        <!-- <input placeholder="邀请码" type="text" class="input-code" /> -->
        </div>
        <div class="main1" style="border: none;">
        <input class="button one" type="button" name id value="注册"  @click="register" />
        <router-link to="/login" class="button two">
            <div class="register">返回</div>
        </router-link>
        </div>
          <!-- 公告 -->
          <el-button plain @click="open1" class="message">系统公告</el-button>
          <br/> <br/><br/>
            <!-- 更新日志显示 -->
          <el-tooltip placement="top">
            <div slot="content">
              2020-05-14：在密码框里面放了一个眼<br/>
              2020-05-14：手机端登录布局及输入提示优化</br>
              </br>
            

            </div>
            <el-button class="message">更新日志</el-button>
          </el-tooltip>
    </div>
  </div>

  <!-- 手机端 -->
   <div  v-else> 
      <div class="phone">
         <div  class="loginForm" >
           <div style="width:80%;margin:0 auto">
              <div class="title" style="margin-bottom:5vh">作业平台注册</div>
              <input class="inputPhone" @blur="inputblur($event)"  v-model="user.username"/>
              <span class="tiptext">请输入学号</span>
              <input class="inputPhone" @blur="inputblur($event)"  v-model="user.name"/>
              <span class="tiptext">请输入姓名</span>
              <input ref="passwordinput" class="inputPhone"  @blur="inputblur" type="password" v-on:keyup.13="login" show-password v-model="user.password" />
              <span ref="tiptextpasword" class="tiptext">请输入密码</span>
              <i  @click="showpassword()" style="float:right;position: relative;top: -52px;" class="el-input__icon el-icon-view el-input__clear"></i>
              <button class="logbtn"  @click="register">注册</button>

              <router-link to="login" style="font-size:12px"> 去登录</router-link>
           </div>
         </div>
      </div>   
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      isphone:false,
      user: {
        username: "",
        name: "",
        password: ""
      }
    };
  },
//   created(){
//       this.register();
//   },
  methods: {
     open1() {
      const h = this.$createElement;

      this.$notify({
        title: "公告",
        message: h(
          "i",
          { style: "color: teal" },
          "该系统为软件工程1801班作业提交系统，由邱洋，熊留新，黄宁，郭长平，罗丽虹，凌静，谢彪，夏紫云等同学共同完成，如遇到BUG请联系上诉同学！"
        )
      });
    },
    register() {
      let reg = /^[\d\w]{9}$/;
      if(!reg.test(this.user.username)){
        this.$message('学号输入有误');
         return
      }
      reg = /^[\u4e00-\u9fa5]{2,4}$/;  
      if(!reg.test(this.user.name)){
        this.$message('姓名输入有误');
         return
      }
      if(!this.user.password){
        this.$message('请输入密码');
         return
      }
      this.axios({
        //参数放在body里面
        method: "post",
        url: "/register",
        data: this.user
      })
        .then(res => {
           if(res.data.code===200){
                this.$router.push({path:'login'});
            }
                this.$message(res.data.data);
        })
        .catch(err => {
          console.log(err);
          
        }); 
    },
     _isMobile() { //判断是手机还是PC
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
      },
      // 手机端
      inputblur(event){  //失去焦点 如果填了就隐藏提示，没填就显示提示文字
       if(event.target.value)
       // event.srcElement.nextElementSibling.innerText ='';
          event.srcElement.nextElementSibling.style.visibility="hidden";
        else
          event.srcElement.nextElementSibling.style.visibility="visible";
      },
      showpassword(){
        console.log(this.$refs.passwordinput.type)
        if(this.$refs.passwordinput.type=="password"){ 
          this.$refs.passwordinput.type='text';
        }else{
          this.$refs.passwordinput.type='password';
        } 
      }
    
  },
  created() {
    if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){ //手机
        this.isphone = true;
     }
  },
};
</script>

<style scoped>
.message{

float: left;
 /* top: 10px; */
 left: 20px;
  /* margin-left: -1470px;
  margin-top: 10px; */
  /* height: 25px;
  width: 50px; */
  padding: 10px 5px;
  background-image: linear-gradient(to right,#feca57,#ff9f43,#feca57);

}
/* .message p{
  margin-left: -10px;
  margin-top: -5px;
} */
.input-name {
  width: 110px;
  margin-left: 15px;
}
.input-name:focus {
  width: 115px;
}
.input-code:focus {
  width: 115px;
}
.input-code {
  width: 110px;
  margin-top: -58px;
  margin-right: 14px;
}

/* 手机端 */
.title {
  font: normal 400 1.5em 楷体;
}

.phone {
  width:100%;
  min-height: 100vh;
  /* margin-top: 5vh; */
  font-family: 宋体;
  background-color: #F1F1F1;
  /* text-align: left; */
  background-image: linear-gradient(120deg,#7ed6df,#4834d4);
  position: fixed;
  
}
.loginForm {
  width:100%;
  margin-top: 15vh;
  padding: 5vh 0;
  background-color: #F1F1F1;
}
.tiptext {
  float: left;
  font-size: 14px;
  transition: 0.2s;
  position: relative;
  top: -45px;
  
}
/* 提示文字的样式 */
/* + 相邻兄弟选择器可选择紧接在另一元素后的元素，且二者有相同父元素。 */
.inputPhone:focus + .tiptext {
  top: -70px;
  font-size: 14px;
}
.inputPhone {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  /* padding: 0 5px; */
  height: 40px;
  border-bottom: 2px solid #9AABD4;
  margin-bottom: 2vh;
  
}
.logbtn{
  display: block;
  width: 100%;
  height: 50px;
  border: none;
  background-image: linear-gradient(120deg,#4834d4,#7ed6df,#4834d4);
  background-size: 200%;
  color: #fff;
  transition: .5s;
  cursor: pointer;
  margin-bottom: 3vh;
}

.logbtn:hover{
  background-position: right;
}
</style>