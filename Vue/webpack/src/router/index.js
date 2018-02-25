import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import login from '../components/login/login.vue'
import manger from '../components/manger/manger.vue'

////////////////////方向/////////////////////////////////////////
import mangerD from '../components/manger/mangerD.vue'
import Dirupdate from '../components/manger/Dirupdate.vue'
import mangerDAdd from '../components/manger/mangerDAdd.vue'


///////////////////阶段///////////////////////////////////////
import mangerStage from '../components/manger/mangerStage.vue'
import mangerSUp from '../components/manger/mangerSUp.vue'
import mangerSAdd from '../components/manger/mangerSAdd.vue'


////////////////////班级//////////////////////////////////////////////
import mangerClass from '../components/manger/mangerClass.vue'
import mangerCUp from  '../components/manger/mangerCUp.vue'
import mangerCAdd from '../components/manger/mangerCAdd.vue'

/////////////////////教师////////////////////////////////////////////////
import mangerTeacher from '../components/manger/mangerTeacher.vue'
import mangerTeacherAdd from '../components/manger/mangerTeacherAdd.vue'
import mangerTeachUp from '../components/manger/mangerTeachUp.vue'


/////////////////////学生////////////////////////////////////////////////
import mangerStudent from '../components/manger/mangerStudent.vue'
import mangerStudentAdd from '../components/manger/mangerStudentAdd.vue'
import mangerStudentUp from '../components/manger/mangerStudentUp.vue'

/////////////////////////教师试题//////////////////////////////////////////////
import teacherindex from '../components/teacher/teacherindex.vue'
import teachertest from '../components/teacher/teachertest.vue'
import teachertestAdd from '../components/teacher/teachertestAdd.vue'
import teachertestUp from '../components/teacher/teachertestUp.vue'
///////////////////////////试卷管理//////////////////////////////////////////////
import papre from '../components/teacher/papre.vue'
import edit from '../components/teacher/edit.vue'
import PapreAdd from '../components/teacher/PapreAdd.vue'
///////////////////////////学生考试//////////////////////////////////////////////////////
import studetindex from '../components/student/studetindex.vue'
import studetexat from '../components/student/studetexat.vue'
import studetpapre from '../components/student/studetpapre.vue'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueResource)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/manger',
        name:'manger',
        component:manger,
        children:[
            {
              path:'mangerD',
              name:'mangerD',
              component:mangerD

            },
            {
                path:'mangerDAdd',
                name:'mangerDAdd',
                component:mangerDAdd

            },
            {
              path:'Dirupdate',
              name:'Dirupdate',
              component:Dirupdate
            },
            {
              path:'mangerStage',
              name:'mangerStage',
              component:mangerStage
            },
            {
                path:'mangerSAdd',
                name:'mangerSAdd',
                component:mangerSAdd

            },
            {
                path:'mangerSUp',
                name:'mangerSUp',
                component:mangerSUp
            },
            {
                path:'mangerClass',
                name:'mangerClass',
                component:mangerClass
            },
            {
                path:'mangerCUp',
                name:'mangerCUp',
                component:mangerCUp
            },
            {
                path:'mangerCAdd',
                name:'mangerCAdd',
                component:mangerCAdd

            },
            {
                path:'mangerTeacher',
                name:'mangerTeacher',
                component:mangerTeacher
            },
            {
                path:'mangerTeacherAdd',
                name:'mangerTeacherAdd',
                component:mangerTeacherAdd
            },
            {
                path:'mangerTeachUp',
                name:'mangerTeachUp',
                component:mangerTeachUp
            },
            {
                path:'mangerStudent',
                name:'mangerStudent',
                component:mangerStudent
            },
            {
                path:'mangerStudentAdd',
                name:'mangerStudentAdd',
                component:mangerStudentAdd
            },
            {
                path:'mangerStudentUp',
                name:'mangerStudentUp',
                component:mangerStudentUp
            }
        ]
      },
    {
        path:'/teacherindex',
          name:'teacherindex',
          component:teacherindex,
          children:[
              {
                  path: 'teachertest',
                  name:'teachertest',
                  component:teachertest
              },
              {
                  path: 'teachertestAdd',
                  name:'teachertestAdd',
                  component:teachertestAdd
              },
              {
                  path: 'teachertestUp',
                  name:'teachertestUp',
                  component:teachertestUp
              },
              {
                  path: 'papre',
                  name:'papre',
                  component:papre
              },
              {
                  path: 'edit',
                  name:'edit',
                  component:edit
              },
              {
                  path:'PapreAdd',
                  name:'PapreAdd',
                  component:PapreAdd
              }

          ]
      },
    {
        path:'/studetindex',
        name:'studetindex',
        component:studetindex,
        children:[
            {
                path:'studetexat',
                name:'studetexat',
                component:studetexat
            },
            {
                path:'studetpapre',
                name:'studetpapre',
                component:studetpapre
            }
        ]
    }
  ]
})


