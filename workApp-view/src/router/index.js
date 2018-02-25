import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import newshow from '@/components/newshow'
import tel from '@/components/tel'
import log from '@/components/log'
import logCont from '@/components/logCont'
import logWiter from '@/components/logWiter'
import logfort from '@/components/logfort'
import user from '@/components/user'
import login from '@/components/logins'
import seting from '@/components/seting'
import setup from '@/components/setup'
import photo from '@/components/photo'
import upass from '@/components/upass'

Vue.use(Router)

var obj=new Router({
  routes: [
      {
          path: '/',
          name: 'index',
          component: index
      },
      {
          path:'/login',
          name:'login',
          component:login
      },
      {
          path:'/newshow/:id',
          name:'newshow',
          component:newshow
      },
      {
          path:'/tel',
          name:'tel',
          component:tel
      },
      {
          path:'/seting',
          name:'seting',
          component:seting
      },
      {
          path:'/setup/:id',
          name:'setup',
          component:setup
      },
      {
          path:'/photo',
          name:'photo',
          component:photo
      },
      {
        path:'/upass',
        name:'upass',
        component:upass
      },
      {
          path:'/log',
          name:'log',
          component:log,

          children:[
              {
                  path:'',
                  name:'logfort',
                  component:logfort,
                  redirect:'/logCont/logCont',
                  children:[
                      {
                          path:'/accept/:type',
                          name:'accept',
                          component:logCont
                      },
                      {
                          path:'/logCont/:type',
                          name:'logCont',
                          component:logCont
                      }
                  ]
              },
              {
                  path:'/logWiter',
                  name:'logWiter',
                  component:logWiter
              },
              {
                  path:'/user',
                  name:'user',
                  component:user
              }
          ]
      }
  ]
})
obj.beforeEach((to, from, next) => {
    if(to.path=="/login"){
        next();
    }else {
        if(sessionStorage.getItem('client')){
            next();
        }else {
            next("/login")
        }
    }
})
export default obj;
