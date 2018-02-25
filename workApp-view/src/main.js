// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Swipe,SwipeItem,Loadmore} from 'mint-ui';
import App from './App'
import router from './router'
import store from './stote/store'
require('@/assets/css/mui.css');
require('@/assets/css/bess.css');
require('./pinyin_dict_firstletter');
require('./pinyinUtil');
import $ from 'jquery';

import './assets/css/bootstrap.min.css'
Vue.config.productionTip = false;
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);

/* eslint-disable no-new */
Vue.use(store);
new Vue({
  el: '#app',
  router,
    store,
  components: { App },
  template: '<App/>'
})
