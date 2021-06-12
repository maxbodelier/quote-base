import Vue from 'vue'
import App from './App.vue'
import VueMq from 'vue-mq'
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';
import VueSession from 'vue-session'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'


//routes
import home from "./components/views/home";
import favourites from "./components/views/favourites";

Vue.use(VueMq, {
    breakpoints: {
        small: 576,
        medium: 768,
        large: 992,
        xLarge: 1200
    }
})
Vue.use(VueMeta)
Vue.use(VueRouter)
Vue.use(VueSession)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })


const router = new VueRouter({
    routes: [
        {path: '/', component: home},
        {path: '/favourites', component: favourites}
    ],
    mode: "history",
    linkActiveClass: "is-active"
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
