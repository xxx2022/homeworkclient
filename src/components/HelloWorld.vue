<template>
  <div class="hello">
   此页面用户模拟登陆，然后保存返回的用户信息，用vuex保存，后面直接使用，使用方法查看 31 行<br/>
   获取所有的作业接口添加了isdelete字段 <br/>
   添加了获取一个同学的待完成作业的接口 <br/>
    登录
        <input type="text" placeholder="学号" v-model="loginUsername">
        <input type="text" placeholder="密码" v-model="loginPassword">
        <button @click="login" >登录</button><br/><br/>

        <router-link to="login" > 去登录页面</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      //登录
            loginUsername:'11',
            loginPassword:'11',
    }
  },
  methods:{
      login(){
            this.axios({  
                method:"post",
                url:"/login",
                data:this.qs.stringify({username:this.loginUsername,password:this.loginPassword}), 
                })
            .then(res =>{
                if(res.data.code != 200)
                  return ;
                //登录成功后通过下面语句将返回的信息保存，其他的组件中就能直接通过 this.$store.state.userinfo.属性  调用学号姓名班级等信息
                this.$store.dispatch("setUserInfoFun",res.data.data); //保存登录信息
                console.log("保存在vuex中的信息为：");
                console.log(this.$store.state.userinfo);
            })
            .catch(err =>{
                console.log(err);
            })
        },
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
