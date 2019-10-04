//放路由的配置檔
import Vue from 'vue';
import VueRouter from 'vue-router';
//官方的元件
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Coupon from '@/components/pages/Coupon';
import Customorder from '@/components/pages/Customorder';
import Productslist from '@/components/pages/Prolist';
//自訂的分頁元件

Vue.use(VueRouter); //會在 Vue 中增加<router-view/> 與 <router-link/> 這兩個組件
//啟用它

export default new VueRouter({
    routes:[
    {
        path:'*',    //*代表任意值
        redirect:'/login' //使用 redirect 是將用戶導回正確的路徑 ，避免用戶進入不存在的頁面
      
    },
    // {
    //  name:'HelloWorld',//元件呈現的名稱
    //  path:'/',//對應的虛擬路徑
    //  component:HelloWorld,//對應的元件
    //  meta: { requiresAuth: true }
    // },
    {
        name:'Login',//元件呈現的名稱
        path:'/login',//對應的虛擬路徑
        component:Login,//對應的元件
    },
    {
        name:'Dashboard',
        path:'/dashboard',
        component:Dashboard,
        children:[
            {
            name:'Products', //產品列表
            path:'products',
            component:Products,
            meta: { requiresAuth: true }
            },
            {
                name:'Products_list',  //訂單列表
                path:'products_list',
                component:Productslist,
                meta: { requiresAuth: true }
                },
                {
                name:'Coupon',  //優惠卷
                path:'coupon',
                component:Coupon,
                meta: { requiresAuth: true }
                },
        ]
        
    },

    {
        name:'admin',
        path:'/',
        component:Dashboard,
        children:[
            {
            name:'CustomOrder',
            path:'custom_order',
            component:Customorder,
            }
        ]
        
    },
   
]
});

