<template>
 <div>
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
        <div class="input " style="border: none;margin-left: 250px;">
            <input placeholder="账号" type="text" style="margin-top: -150px;" v-model="loginUsername" />
            <input  ref="passwordinput"  placeholder="密码" type="password" v-model="loginPassword" show-password />
            <i  @click="showpassword()" style="float:right;position: relative;top: -58px;right:25px;color:#000" class="el-input__icon el-icon-view el-input__clear"></i>
        </div>
        <div class="main1" style="border: none;">
            <input class="button one" type="button" name id value="登入" @click="login" />
            <router-link to="/register" class="button two">
                <div class="register">注册</div>
            </router-link>
        </div>
          <!-- 公告 -->
          <el-button plain @click="open1" class="message">系统公告</el-button>
          <br/> <br/><br/>
            <!-- 更新日志显示 -->
          <el-tooltip placement="top">
            <div  slot="content">
              2020-05-14：在密码框里面放了一个眼<br/>
              2020-05-14：手机端登录布局及输入提示优化</br>
              </br>
            

            </div>
            <el-button class="message">更新日志</el-button>
          </el-tooltip>
       </div>
   </div>

   
   <!-- 手机的登录页 -->
    <div  v-else> 
      <div class="phone">
         <div  class="loginForm" >
           <div style="width:80%;margin:0 auto">
              <div class="title" style="margin-bottom:5vh">作业平台登录</div>
              <input class="inputPhone" @blur="inputblur($event)"  v-model="loginUsername"/>
              <span ref="tiptextusername" class="tiptext">请输入学号</span>
              
              <input ref="passwordinput"  class="inputPhone"  @blur="inputblur" type="password" v-on:keyup.13="login" v-model="loginPassword" >
              <span ref="tiptextpasword"  class="tiptext">请输入密码</span>
              <i  @click="showpassword()" style="float:right;position: relative;top: -52px;" class="el-input__icon el-icon-view el-input__clear"></i>
             
              <input  class="inputPhone" style="border-color: #F1F1F1;" disabled  />
              <span  class="tiptext">&nbsp;</span>

              <button class="logbtn"  @click="login">登录</button>

              <router-link to="register" style="font-size:12px;"> 去注册</router-link>

           </div>
           
          <!-- <div class="grid-content">
              <span class="title">标题</span>
              <el-form  label-width="25px" class="demo-loginForm">
              <el-form-item label="" >
                <el-input  placeholder="请输入账号" v-model="loginUsername"></el-input>
              </el-form-item>
              <el-form-item label=""  >
              
                <el-input type="password" v-on:keyup.13.native="login" v-model="loginPassword" placeholder="请输入密码"></el-input>
              </el-form-item>
              
              <el-button type="primary"  class="logbtn"  style="font-size:20px;margin:0 auto" @click="login">登&nbsp;录</el-button>
                &nbsp;
            
            </el-form>
            </div> -->
            
         </div>
        <div style="width:100%; position: absolute;bottom:2vh;font-size:14px"><a href="http://beian.miit.gov.cn" target="_blank" >赣ICP备20002298号</a></div>
      </div>   
    </div>

    



 </div>
</template>

<script>

export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      isphone:false
    };
  },
  methods: {
    open1() {
      const h = this.$createElement;

      this.$notify({
        title: "公告",
        message: h(
          "i",
          { style: "color: teal" },
          "该系统为软件工程1801班作业提交系统，由邱洋，熊留新，黄宁，郭长平，罗丽虹，凌静，谢彪，夏紫云等同学共同完成，如有疑问请联系熊师傅！"
        )
      });
    },
    login() {
        if(!this.loginUsername || !this.loginPassword){
            this.$message.error("请输入完整");
            return 
        }
      this.axios({
        method: "post",
        url: "login",
        data: this.qs.stringify({
          username: this.loginUsername,
          password: this.loginPassword
        })
      })
        .then(res => {
          console.log(res.data);
          if(res.data.code===200){
                this.$store.dispatch("setUserInfoFun",res.data.data); //保存登录信息
            // this.setCookies();  //登录之后获取cookie
                
                this.setCookie(this.loginUsername,this.loginPassword,7) //保存7天
                this.$router.push({path:'homepage'});
            }
            else
                this.$message.error(  res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
     //设置cookie
    setCookie(account, password, exdays) {
      // Encrypt，加密账号密码
      var cipherAccount = this.CryptoJS.AES.encrypt( account+'', "secretkey123" ).toString();
      var cipherPassword = this.CryptoJS.AES.encrypt(password+'', "secretkey123").toString();
      console.log(cipherAccount+'/'+cipherPassword)//打印一下看看有没有加密成功

      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie,加密后的字符串也有个=号,所以用==
      window.document.cookie =  "account" +  "==" + cipherAccount + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "==" + cipherPassword + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length != 0) {
        var arr = document.cookie.split("; "); 
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=="); //根据==切割
          //判断查找相对应的值
          if (arr2[0] == "account") {
            // Decrypt，将解密后的内容赋值给账号
            var bytes = this.CryptoJS.AES.decrypt(arr2[1], "secretkey123");
           // console.log("账号"+bytes.toString(this.CryptoJS.enc.Utf8));
            this.loginUsername = bytes.toString(this.CryptoJS.enc.Utf8)-0;
          } else if (arr2[0] == "password") {
            // Decrypt，将解密后的内容赋值给密码
            var bytes = this.CryptoJS.AES.decrypt(arr2[1], "secretkey123");
          //  console.log("密码"+bytes.toString(this.CryptoJS.enc.Utf8));
            this.loginPassword = bytes.toString(this.CryptoJS.enc.Utf8);
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); 
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
      this.getCookie();
      if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){ //手机
        this.isphone = true;
     };
   
    },
    mounted(){
      if(this.username!=''){
        //let tiptext = this.$refs.tiptextusername;
        // let tiptext = document.getElementsByClassName('tiptext')[0];
            // console.log('进去了')
            this.$refs.tiptextusername.style.visibility="hidden";
          //  console.log(this.$refs.tiptextusername.style.visibility="hidden")
             
            //this.$refs.tiptext.style.visibility="hidden";
          }
          //console.log(this.loginUsername)
       if(this.loginPassword!=''){
         this.$refs.tiptextpasword.style.visibility="hidden";
        //console.log(this.$refs.tiptextpasword.style.visibility="hidden")
      }

      }
     
    
  }
</script>


<style  scoped>
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
  transition: 0.0s;
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