import Vue from 'vue'
import Router from 'vue-router'
import echart from '@/components/echart'
import index from '@/components/index'
import admin from  '@/components/admin'
import adminlogin from '@/components/alogin'
import uppass from '@/components/uppass'
import leveadd from '@/components/leveadd'
import leveshow from '@/components/leveshow'
import leveup from '@/components/editLeve'
import roleadd from '@/components/roleadd'
import roleshow from '@/components/roleshow'
import roleup from '@/components/editRrole'
import adminadd from '@/components/adminadd'
import portadd from '@/components/portadd'
import portshow from '@/components/portshow'
import editPort from '@/components/editPort'
import editAdmin from '@/components/editAdmin'
import usershow from '@/components/usershow'
import useradd from '@/components/useradd'
import edituser from '@/components/edituser'
import banner from '@/components/banner'
import banneradd from '@/components/banneradd'





Vue.use(Router)


var obj=new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
          {
            path:'/index',
            name:'echart',
            component:echart
          },
          {
            path:'/admin',
            name:'admin',
              component:admin
          },
          {
              path:'/adminadd',
              name:'adminadd',
              component:adminadd
          },
          {
              path:'/editAdmin',
              name:'editAdmin',
              component:editAdmin
          },
          {
             path:'/uppass',
             name:'uppass',
             component:uppass
          },
          {
              path:'/leveadd',
              name:'leveadd',
              component:leveadd
          },
          {
              path:'/leveshow',
              name:'leveshow',
              component:leveshow
          },
          {
              path:'/leveup',
              name:'leveup',
              component:leveup
          },
          {
              path:'/roleadd',
              name:'roleadd',
              component:roleadd
          },
          {
              path:'/roleshow',
              name:'roleshow',
              component:roleshow
          },
          {
              path:'/roleup',
              name:'roleup',
              component:roleup
          },
          {
              path:'/portadd',
              name:'portadd',
              component:portadd
          },
          {
              path:'/portshow',
              name:'portsow',
              component:portshow
          },
          {
              path:'/editPort',
              name:'editPort',
              component:editPort
          },
          {
              path:'/usershow',
              name:'usershow',
              component:usershow
          },
          {
              path:'/useradd',
              name:'useradd',
              component:useradd
          },
          {
              path:'/edituser',
              name:'edituser',
              component:edituser
          },
          {
              path:'/banner',
              name:'banner',
              component:banner
          },
          {
              path:'/banneradd',
              name:'banneradd',
              component:banneradd
          }
          ]
    },
      {
          path:"/adminlogin",
          name:"adminlogin",
          component:adminlogin
      }
  ]
})
obj.beforeEach((to, from, next) => {
    if(to.path=="/adminlogin"){
        next();
    }else {
        if(sessionStorage.getItem('login')){
            next();
        }else {
            next("/adminlogin")
        }
    }
})
export default obj;

