<template>
  <div id="home">
  <div id="title">
    <h2 class="text-center">Welcome to crowdfunding app</h2>
  </div>
  <div id="viewProjects" class="text-center">
    <router-link class ="btn btn-lg btn-success"  to="/projects">View current projects</router-link>
  </div>
  <div v-if="!token" id="loginAndregister" class="text-center">
    <router-link class ="btn btn-lg btn-success" to="/login">Login/Register</router-link>
  </div>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                token:sessionStorage.getItem('authToken'),

            }
        }
    }
</script>

<style>
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 200px;
  }
  #viewProjects{
    margin-top:50px;
  }
  #loginAndregister{
    margin-top: 20px;
  }

</style>

