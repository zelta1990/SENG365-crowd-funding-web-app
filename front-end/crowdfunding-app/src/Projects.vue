<template>
  <div>
    <app-nav></app-nav>
    <h2 class="text-center", style = "font-size: 200%">View ongoing projects</h2>
  <hr/>

    <div class="col-sm-4" v-for="project in projects">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title", style = "background-color:#00CC00">{{project.title}}</h3>
        </div>
        <div class="panel-body">
          <div class = "row">
            <div class = "col-sm-2">
              <label>Project ID {{project.id}}</label>
              <label>Subtitle {{project.subtitle}}</label>
            </div>
            <img  src="{{project.image}}" class="pull-right img-responsive" alt = "project image" width="150">
          </div>
        </div>
      </div>
    </div>

    <div class = "col-sm-12">
      <div class = "jumbotron text-center">
        <h2 style="font-size: 200%">Log in to back or start a project</h2>
      </div>
    </div>

    <div class = "col-sm-12">
      <div class = "jumbotron text-center">
        <h2 style="font-size: 200%">Not a member? Register today!</h2>
      </div>
    </div>

  </div>
</template>

<script>
  import AppNav from './AppNav';
  import {isLoggedIn} from '../../utils/auth';
  import {getProjects} from '../../utils/crowdfunding-api';

  const BASE_URL = 'http://csse-s365.canterbury.ac.nz:4888';

  export default {
      name: 'viewAllProjects',
      components:{
          AppNav,
      },
      data(){
          return{
              error:"",
              errorFlag:false,
              projects:[]
          }
      },
      methods:{
          isLoggedIn(){
              return isLoggedIn();
          },
          getProjetcs:function () {
              this.$http.get('${BASE_URL}/api/v2/projects')
                  .then(function(response) {
                      this.projects = response.data;
                  },function(error){
                      this.error=error;
                      this.errorFlag=true;
                  })
          },
          mounted(){
              this.getProjetcs();
          }
      }
  }
</script>

<style scoped>
  </style>