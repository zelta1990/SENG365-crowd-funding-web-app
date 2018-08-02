import Vue from 'vue';
import App from './App.vue';
import User from './User.vue';
import Projects from './Projects.vue';
import SingleProject from './SingleProject.vue';
import AppNav from './AppNav.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
    {
        path:'/',
        name: 'viewAllProjects',
        component: Projects,
    }
];
const router = new VueRouter({
    routes:routes,
    mode:'history'
});
Vue.http.options.emulateJSON=true;

new Vue({
    el: '#app',
    router:router,
    render: h => h(App)
})
