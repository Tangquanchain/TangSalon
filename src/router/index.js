//放路由的配置檔

//官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

//自訂的分頁元件
//manager
import Login from '@/components/manager/pages/Login';
import Dashboard from '@/components/manager/Dashboard';
import Products from '@/components/manager/pages/Products';
import Coupon from '@/components/manager/pages/Coupon';
import Customorder from '@/components/manager/pages/Customorder';
import Productslist from '@/components/manager/pages/Prolist';
import CustomCheckout from '@/components/manager/pages/CustomCheckout';
//customer
import CustomerDashboard from '@/components/customer/CustomerDashboard';

Vue.use(VueRouter); //會在 Vue 中增加<router-view/> 與 <router-link/> 這兩個組件
//啟用它

export default new VueRouter({
    routes:[
    {
        path:'*',    //*代表任意值
        redirect:'/login' //使用 redirect 是將用戶導回正確的路徑 ，避免用戶進入不存在的頁面
      
    },
    {
        name:'Login',//元件呈現的名稱
        path:'/login',//對應的虛擬路徑
        component:Login,//對應的元件
    },

    //customer路由

    {
        name:'customer_dashboard',
        path:'/customer_dashboard',
        component:CustomerDashboard,
        children:[
        ]
    },





    //manager路由
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
            },
            {
                name:'CustomCheckout',
                path:'custom_checkout/:orderId', //最終結帳頁面
                component:CustomCheckout,
                }
        ]
        
    },
   
]
});

