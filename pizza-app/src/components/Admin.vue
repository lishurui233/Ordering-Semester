<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <!-- new pizza -->
            <app-new-pizza></app-new-pizza>
        </div>
        <div class="col-sm-12 col-md-4">
            <!-- 品种展示 -->
            <h3 class="text-info my-5">Menu</h3>
            <table class="table">
                <thead class="table table-default">
                    <tr>
                        <th>品种</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItems" :key="item.name">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>
                            <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
                            <!-- 设置红色❌btn按钮 -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import NewPizza from './NewPizza.vue'
    export default{
        data(){
            return{
                // getMenuItems:[]
            }
        },
        components:{
            'app-new-pizza':NewPizza
        },
        created(){
            //从野狗请求数据，如果请求成功，那么我们可以得到res，res是一个可读的数据流，需要进行处理，
            //再return，return以后得到data，对data进行遍历，把key作为id放到数据里面。得到数组menuArray，把它赋给getmenuitems,即现在所得到的每一个对象。
            fetch("https://wd0486188552fjsojr.wilddogio.com/menu.json")
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    let menuArray = []
                    for(let key in data){
                        data[key].id = key
                        menuArray.push(data[key])
                    }
                    // this.getMenuItems = menuArray
                    //数据同步
                    this.$store.commit('setMenuItems',menuArray)
                })
        },
        computed:{
            getMenuItems:{
                //从vuex中获取数据
                get(){
                    // return this.$store.state.menuItems
                    //通过getters获取数据
                    return this.$store.getters.getMenuItems
                },
                set(){

                }
            }
        },
        methods:{
            deleteData(item){
                fetch("https://wd0486188552fjsojr.wilddogio.com/menu/" + item.id +"/.json",
                {method:"DELETE",
                    headers:{
                        'Content-type':'application/json'
                        // 网页中存在的Content-Type属性指定请求和响应的HTTP内容类型为json字符串。
                    }
                })
                .then(res => res.json())
                // .then(data => this.$router.push({name:"menuLink"}))
                .then(data => {
                    this.$store.commit('removeMenuItems',item)})
                    .catch(err => console.log(err))

            }
        }
    }
</script>