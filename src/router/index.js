import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/view/register'
import Login from '@/view/login'
import Sjhdl from '@/view/sjhdl'
import Main from '@/view/main'
import Yzmdl from '@/view/yzmdl'
import Wjmm from '@/view/wjmm'
import Touzi from '@/view/touzi'
import Shouye from '@/view/shouye'
import Wode from '@/view/wode'
import Jbdq from '@/view/jbdq'
import Jblq from '@/view/jblq'
import Detail from '@/view/detail'
import Cjjl from '@/view/cjjl'
import Xxpl from '@/view/xxpl'
import Xmsm from '@/view/xmsm'
import Goumai from '@/view/goumai'
import Chongzhi from '@/view/chongzhi'
import Gmjl from '@/view/gmjl'

import fom from '@/view/fom'
import foma from '@/view/foma'
import fomb from '@/view/fomb'
import fomc from '@/view/fomc'
import one from '@/view/lianxi/one'








Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/main',
      component: HelloWorld

    },
    {
      path: '/chongzhi',

      component: Chongzhi

    },

    {
      path: '/fomb',

      component: fomb,


    },
    {
      path: '/fomc',
      name:fomc,
      component: fomc,


    },
    {
      path: '/fom',

      component: fom,


    },
    {
      path: '/one',

      component: one,


    },
    {
      path: '/gmjl',

      component: Gmjl

    },
    {
      path:'/goumai/:id',
      component:Goumai
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/login',
      redirect:'/sjhdl',
      component:Login,

      children:[
        {path:'/sjhdl',component:Sjhdl,meta:{auth:true}},
        {path:'/yzmdl',component:Yzmdl}
      ]

    },
    {
      path:'/main',
      component:Main,
      redirect:'/shouye',
      children:[
        {path:'/touzi',
        component:Touzi,
        redirect:'/jblq',
        children:[
          {path:'/jbdq',component:Jbdq},
          {path:'/jblq',component:Jblq}
        ]

      },
        {path:'/shouye',component:Shouye},
        {path:'/wode',component:Wode}


      ]
    },


    {
      path:'/wjmm',
      component:Wjmm
    },
    {
      path:'/detail/:id',component:Detail,
      // redirect:'/xmsm',
      children:[
        {path:'/xmsm',component:Xmsm},
        {path:'/xxpl',component:Xxpl},
        {path:'/cjjl',component:Cjjl}
      ]
    }



  ],


  //
})
