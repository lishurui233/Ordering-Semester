<template>
    <div class="row mt-3">
        <div class="col-md-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <img class="mx-auto d-block" src="../../src/assets/icon.png" alt="">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="email">邮箱</label>
                            <input 
                            type="email"
                            class="form-control"
                            v-model="email"
                            >
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input 
                            type="password"
                            class="form-control"
                            v-model="password"
                            >
                        </div>
                        
                        <button type="submit" class="btn btn-block btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data(){
            return{
                email:'',
                password:''
            }
        },
        beforeRouteEnter (to, from, next) {
            // 导航守卫(组件内守卫)，在header.vue里面点击退出，跳转到登录页面，首先将用户进行清空，就只是登录注册页面，不会显示用户名，实现守卫。
            next(vm => vm.$store.dispatch("setUser",null))
        },
        methods:{
            onSubmit(){
                axios.get('/users.json')
                .then(res=>{
                    // console.log(res)
                    const data = res.data
                    const users = []
                    for (const key in data) {
                        const user = data[key]
                        // console.log(user)
                        users.push(user)
                    }

                    //实现过滤
                    let result = users.filter((user)=>{
                        return user.email === this.email && user.password === this.password
                    })

                    //判断result长度是否大于0
                    if(result != null && result.length > 0){
                        //更改当前的登录状态，把用户名和邮箱进行拼接
                        this.$store.dispatch("setUser",result[0].email)

                        this.$router.push({name:"homeLink"})
                    }else{
                        alert("账号或密码错误！")

                        //没有登录成功需要进行清空
                        this.$store.dispatch("setUser",null)
                    }
                })
            }
        }
    }
</script>