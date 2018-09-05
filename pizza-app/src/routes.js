import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/about/About'

//二级路由,因为这四个路由都属于about下，所以我们应该找到about，放到about下
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'

export const routes = [
    {  path:'/',name:"homeLink",components:{
        default:Home,
        'orderingGuide':OrderingGuide,
        'delivery':Delivery,
        'history':History
    }},//此时，点击Home展示主页内容，点击菜单展示Menu内容
    {  path:'/menu',name:"menuLink",component:Menu},
    {  path:'/admin',name:"adminLink",component:Admin,
      // beforeEnter: (to, from, next) => {
      // ...路由独享守卫
      // alert("非登录状态，不能访问此页面！")
      // next(false);
      // if (to.path == '/login' || to.path == '/register') {
      //   next();
      // }else{
      //   alert("还没有登录,请先登录！");
      //   next('/login');
      // }}
    },
    {  path:'/login',name:"loginLink",component:Login},
    {  path:'/register',name:"registerLink",component:Register},
    {  path:'/about',name:"aboutLink",redirect:'about/contact',component:About,children:[
      {path:'/about/contact',name:"contactLink",component:Contact,children:[
        {path:'about/contact/phone',name:"phoneNumber",component:Phone},
        {path:'about/contact/personName',name:"personName",component:PersonName}
      ]},
      {path:'/about/delivery',name:"deliveryLink",component:Delivery},
      {path:'/about/history',name:"historyLink",component:History},
      {path:'/about/orderingGuide',name:"orderingGuideLink",component:OrderingGuide}
    ]},
    {  path:'*',redirect:'/'}
  
  ]