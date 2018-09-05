<template>
  <div class="row">
    <!-- 菜单 -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td><strong>{{item.name}}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td>
              <button 
                @click="addToBasket(item,option)"
                class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
      <div v-if="baskets.length > 0">
        <table class="table">
          <thead class="thead-default">
            <tr>
              <th>数量</th>
              <th>品种</th>
              <th>价格</th>
            </tr>
          </thead>
        <tbody v-for="item in baskets" :key="item.name">
          <tr>
            <td>
              <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
              <span>{{item.quantity}}</span>
              <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
            </td>
            <td>{{item.name}}{{item.size}}</td>
            <td>{{item.price * item.quantity}}</td>
          </tr>
        </tbody>
      </table>
      <p>总价: {{total + "RMB"}}</p>
      <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>
        {{basketText}}
      </div>      
    </div>    
  </div>
</template>
<script>
  export default{
    data(){
      return{
        baskets:[],
        basketText:"购物车没有任何商品",
        // getMenuItems:{
          // 1: {
          //   'name': '榴莲pizza',
          //   'description': '这是喜欢吃榴莲朋友的最佳选择',
          //   'options': [{
          //     'size': 9,
          //     'price': 38
          //   }, {
          //     'size': 12,
          //     'price': 48
          //   }]
          // },
          // 2: {
          //   'name': '芝士pizza',
          //   'description': '芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚',
          //   'options': [{
          //     'size': 9,
          //     'price': 38
          //   }, {
          //     'size': 12,
          //     'price': 48
          //   }]
          // },
          // 3: {
          //   'name': '夏威夷pizza',
          //   'description': '众多人的默认选择',
          //   'options': [{
          //     'size': 9,
          //     'price': 36
          //   }, {
          //     'size': 12,
          //     'price': 46
          //   }]
          // }
        // }
      }
    },
    computed:{
      getMenuItems(){
        //在vuex中获取数据
        // return this.$store.state.menuItems
        //通过getters获取数据
        return this.$store.getters.getMenuItems
      },
      total(){
        let totalCost = 0;
        for (let index in this.baskets) {
          let individualItem = this.baskets[index]//拿到每一个对象
          totalCost += individualItem.quantity * individualItem.price
        }
        return totalCost
        }
      },
    created(){
      this.fetchData()
    },

    methods:{
      fetchData(){
        // fetch("https://wd0486188552fjsojr.wilddogio.com/menu.json")
        //   .then(res => {
        //     return res.json()
        //     })
        //   .then(data => {
        //     this.getMenuItems = data
        //   })

        //axios.get("menu.json")
        //.then(res=>this.getMenuItems = res.data)

        //this.http.get("menu.json")
        //.then(res=>this.getMenuItems = res.data)

        //将请求下来的数据存储到vuex中
        this.http.get("menu.json")
                      .then(res => this.$store.commit("setMenuItems",res.data))
      },

      addToBasket(item,option){
        let basket = {
          name:item.name,
          size:option.size,
          price:option.price,
          quantity:1
        }
        if (this.baskets.length > 0) {
          //过滤，购物车里面已经有了重复的物品，ES6属性filter，拿到每一个basket，拿到数组里面每一个对象
          //然后对它进行匹配，当前的name和price是否一致，
          let result = this.baskets.filter((basket) =>{
          return (basket.name === item.name && basket.price === option.price)})//如果相等，就说明此时购物车里面有这个东西
            //过滤出来的东西长度如果大于1，就对quantity进行++，否则就push进去。（这一步用来解决从菜单上面第二次添加商品，添加不成功的问题，在此步之前从购物车添加数量已经成功）
            if(result != null && result.length > 0){
              result[0].quantity++
            }else{
              this.baskets.push(basket)
            }

        } else {
          this.baskets.push(basket)
          //说明baskets里面什么也没有，那么就把得到的basket push进去
        }
      },
      decreaseQuantity(item){
        item.quantity --
        if (item.quantity <= 0) {
          this.removeFromBasket(item)
        }
      },
      increaseQuantity(item){
        item.quantity++
      },
      removeFromBasket(item){
        this.baskets.splice(this.baskets.indexOf(item),1)
        //indexOf() 方法可返回数组中某个指定的元素位置。
      }
    }
  }
</script>