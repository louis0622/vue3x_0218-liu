import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopInfo from '../pages/Shop/ShopInfo.vue'
import ShopGoods from '../pages/Shop/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings.vue'
export default [
  {
    path: '/shop',
    component: Shop,
    children:[
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/msite',
    component: Msite,
    meta: {showFooter:true}
  },
  {
    path: '/order',
    component: Order,
    meta: {showFooter:true}
  },
  {
    path: '/profile',
    component: Profile,
    meta: {showFooter:true}
  },
  {
    path: '/search',
    component: Search,
    meta: {showFooter:true}
  },
  {
    path: '/',
    redirect: '/msite'
  },
]
