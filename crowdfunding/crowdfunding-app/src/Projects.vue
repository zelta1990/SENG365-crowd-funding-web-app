<template>
    <div id="main">
        <h2 class="text-center">Hi {{this.userName}}, welcome to crowdfunding App</h2>

        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>


        <!-------------------------------------->
        <div>
            <div id = "projects" class="text-center">
                <div v-if="token" id="startProject" class="container text-center">
                    <div class="row" id="start">
                        <router-link class ="btn btn btn-success" to="/startProject">Start a project</router-link>
                    </div>
                </div>
                <div id="projectform">
                    <div id="searchbox" class="container text-right">
                        <input type="text" v-model="searchText" placeholder="search project by title"/><button class="btn btn-success" id="cancel" @click="cancel">Cancel</button>
                    </div>
                    <div id="selectView" class="container text-right" v-if="token">
                        <span>Filter</span>
                        <select v-model="selected">
                            <option disabled value="">Please select one</option>
                            <option>All projects</option>
                            <option>projects I created</option>
                            <option>projects I backed</option>
                        </select>
                    </div>
                    <table align="center">
                        <tr v-for="project in filteredProjects" class="single-project">
                            <div v-if="project.open">
                                <table class="table table=bordered">
                                    <thead>
                                    <tr class="info">
                                        <th>Project Title</th>
                                        <th>Project ID</th>
                                        <th>Project Subtitle</th>
                                        <th>Project Image</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td width=150>{{ project.title }}</td>
                                        <td>{{ project.id }}</td>
                                        <td width = 400>{{ project.subtitle }}</td>
                                        <td>
                                            <img v-bind:src ="'http://csse-s365.canterbury.ac.nz:4888/api/v2'+project.imageUri" width="100" heigth="100" alt="Project image"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                    <td><router-link class ="btn btn-success"  :to=" {name: 'project', params: { id: project.id}}">View</router-link></td>
                                </table>
                            </div>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div id="backToHome" class="text-center">
            <div class="row">
                <router-link class ="btn btn-success" to="/">Back to home</router-link>
            </div>
        </div>

        <!--begin of log out-->

        <div class="container" v-if="token">
            <div class="account-info text-center">
                <button class="btn btn-danger" @click="logout">Log out</button>
            </div>

        </div>
        <!--End of log out-->


    </div>

</template>


<script>
    const BASE_URL = 'http://csse-s365.canterbury.ac.nz:4888';
    export default {
        data(){
            return{
                error:"",
                errorFlag:false,
                projects:[],
                result:null,
                searchText:"",
                hasBeenOpened:false,
                image:'',
                token:sessionStorage.getItem('token'),
                userName:sessionStorage.getItem('userName'),
                userid:sessionStorage.getItem('userid'),
                pledge:{
                    amount:0,
                    anonymous:false,
                    card:""
                }
            }
        },
        mounted(){
            this.getProjects();
        },
        methods:{

            getProjects:function () {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4888/api/v2/projects')
                    .then(function(response) {
                        this.projects = response.data;
                    },function(error){
                        this.error=error;
                        this.errorFlag=true;
                    })
            },

            logout: function() {
                var logoutUrl = 'http://csse-s365.canterbury.ac.nz:4888/api/v2/users/logout';
                var headers = {'x-authorization': sessionStorage.getItem('token')};
                $.ajax({
                    type:'POST',
                    dataType:'text',
                    url: logoutUrl,
                    headers:headers,
                    success:function(response){
                        this.isLoggedOut='You are not logged in';
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('userName');
                        sessionStorage.removeItem('email');
                        sessionStorage.removeItem('userid');

                        window.location.href = '/';
                    },
                    error:function(){
                        alert("logout unsuccessful");

                    }
                })
            },

            cancel:function(){
                this.searchText="";
            }

        },
        computed: {
            filteredProjects: function(){
                return this.projects.filter((project) => {
                    return (project.title.toLowerCase()).match(this.searchText.toLowerCase());
                });
            }
        }

    }
</script>

<style>
    #main{
        margin-top: 0px;
    }
    #backToHome{
        margin-top: 20px;
        margin-bottom: 15px;
    }
    #startProject{
        margin-top:5px;
        magin-bottom:5px;
    }
    #projectform{
        margin-top: 5px;
    }
    #searchbox{
        margin-bottom: 5px;
    }
    #selectView{
        margin-bottom: 5px;
    }
    #cancel{
        margin-left:5px;
    }

</style>