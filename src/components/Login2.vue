<template>
    <div >
        登录界面<br/>
        学号<input v-model="username"/><br/><br/>
        密码<input v-model="password" /><br/>
        <button @click="login()">登录</button><br/>
        <router-link to="register" > 去注册</router-link>
        <router-link to="homepage" > 主页</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:'180706031',
            password:'123456',
        }
    },
    methods:{
        login(){ //登录成功设置cookie
            this.axios.post("/login",this.qs.stringify({username:this.username,password:this.password}))
            .then(res =>{
                console.log(res);
                if(res.data.code===200){
                    this.$store.dispatch("setUserInfoFun",res.data.data); //保存登录信息
                   // this.setCookies();  //登录之后获取cookie
                    this.$router.push({path:'homepage'});
                }
                else
                    this.$message(res.data.data);
            })
            .catch(err =>{
                console.log(err);
                 this.$message("登录失败");
            })
        },
        setCookies(){
            this.axios.get("/setCookies")
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
    ,
    created(){
       //this.setCookies();
    }
}
</script>