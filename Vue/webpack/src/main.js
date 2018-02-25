// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

/* eslint-disable no-new */
router.beforeEach((to,from,next)=> {
    if (to.path == "/") {
        next();
    } else {
        if (sessionStorage.user) {
            next();
        } else {
            router.push('/');
        }
    }
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

