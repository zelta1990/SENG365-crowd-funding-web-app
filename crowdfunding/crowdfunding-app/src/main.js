import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects.vue';
import singleProject from './singleProject.vue';
import startProject from './startProject.vue';
import login from './login.vue';
import VueResource from 'vue-resource';
import ToggleButton from 'vue-js-toggle-button';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ToggleButton);
//Vue.http.options.emulateJSON = true;


const routes = [
    {
        path:"/",
        component: Home
    },
    {
      path:"/projects",
        name: "projects",
        component:Projects
    },
    {
        path:"/projects/:id",
        name: "project",
        component: singleProject
    },
    {
        path:"/login",
        name:"login",
        component:login
    },
    {
        path:"/startProject",
        name:"startProject",
        component:startProject
    }

];

const router = new VueRouter({
    routes: routes,
    mode:'history'
});

new Vue({
  el: '#app',
    router:router,
  render: h => h(App)
});
