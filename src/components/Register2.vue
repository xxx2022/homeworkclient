<template>
    <div>
        <input type="text" placeholder="学号" v-model="user.username"><br/><br/>
        <input type="text" placeholder="姓名" v-model="user.name"><br/><br/>
        <input type="text" placeholder="密码" v-model="user.password"><br/><br/>
        <button @click="register">注册</button><br/><br/>
         <router-link to="login" > 去登录</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //注册信息
            user:{
               username:'',
               name:'',
               password:'',
            },
        }
    },
    methods:{
         //注册传一个对象
        register(){
            this.axios({  //参数放在body里面
                method:"post",
                url:"/register",
                data:this.user,
                })
            .then(res =>{
                console.log(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
        },
    }
}
</script>