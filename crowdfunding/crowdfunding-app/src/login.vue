<template>
  <div class="registerandlogin">
    <div id="register">
      <div class="container">
        <h2>Register an account</h2>
        <div class="form-group">
          <label>username</label>
          <input type="text" id="rusername" v-model="registerModel.username" required/>
        </div>
        <div class="form-group">
          <label>location</label>
          <input type="text" id ="rlocation" v-model="registerModel.location" />
        </div>

        <div class="form-group">
          <label>email</label>
          <input type="text" id="remail" v-model="registerModel.email" required/>
        </div>
        <div class="form-group">
          <label>password</label>
          <input type="password" id = "rpassword" v-model="registerModel.password" required/>
        </div>

        <div class="form-group">
          <label></label>
          <button class = "btn btn-primary" @click="register">Register</button>
        </div>
      </div>
    </div>
    <!--Begin of login form-->

    <div id="login">
      <div class="container">
        <h2>Login to an account</h2>
        <div class="form-group">
          <label>username</label>
          <input type="text" id="lusername" v-model="loginModel.username" />
        </div>
        <div class="form-group">
          <label>email</label>
          <input type="text" id="lemail" v-model="loginModel.email" />
        </div>
        <div class="form-group">
          <label>password</label>
          <input type="password" id = "lpassword" v-model="loginModel.password" />
        </div>

        <div class="form-group">
          <label></label>
          <button class = "btn btn-success" @click="login">Log in</button>
        </div>
      </div>
    </div>
    <!--begin of log out-->

    <div class="container text-center">
      <span id="message">{{ this.msg }}</span>
    </div>
    <div class="container">
      <div class="account-info" v-if="userName">
        <span >{{ userName }} | <a href="#" @click="logout">Log out</a></span>
      </div>
      <div class="account-info" v-else-if="email">
      <span >{{ email }} | <a href="#" @click="logout">Log out</a></span>
      </div>

    </div>
    <!--End of log out-->

    <div class="container text-center">
      <div id="backtohome" >
        <router-link class ="btn btn-info" to="/">Back to home</router-link>
        <router-link class ="btn btn-info" to="/projects">View projects</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                registerUrl: 'http://csse-s365.canterbury.ac.nz:4888/api/v2/users',
                //  loginUrl: 'http://csse-s365.canterbury.ac.nz:4888/api/v2/users/login',
                registerModel: {
                    username: "",
                    location: "",
                    email: "",
                    password: ""
                },
                loginModel:{
                    username:"",
                    email:"",
                    password:""
                },
                msg:'',
                userName:'',
                email:'',
                userid:''

            }
        },
    /*    ready: function() {
            this.userName = sessionStorage.getItem('userName');
            this.email = sessionStorage.getItem('email');
            this.userid = sessionStorage.getItem('userid');
        },*/
        methods: {
            register: function() {
                this.msg = '';
                var jsonfile1 = {
                    "username": this.registerModel.username,
                    "location": this.registerModel.location,
                    "email": this.registerModel.email,
                    "password": this.registerModel.password
                }
               // var loginUrl = 'http://csse-s365.canterbury.ac.nz:4888/api/v2/users/login?username=' + this.registerModel.username + '&email=' + this.registerModel.email + '&password=' + this.registerModel.password;
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerModel.email)) {

                    this.$http.post(this.registerUrl, jsonfile1)
                        .then((response) => {
                            this.msg = 'Register successful!'
                        }).then(
                        this.$http.post(loginUrl)
                            .then((response) => {
                                this.msg = 'Hi ' + this.registerModel.username + ', you are logged in!';
                                this.userName = this.registerModel.username;
                                sessionStorage.setItem('userid',response.data.id);
                                sessionStorage.setItem('token', response.data.token);
                                sessionStorage.setItem('userName', this.userName);
                            //    alert(response.data.id);
                              //  alert(sessionStorage.getItem('userid'));

                                window.location.href = '/projects';

                            }).catch((response) => {
                            this.msg = "Register unsuccessful!";
                        })
                    )
                }else{
                    this.msg="Invalid email";
            }

            },
            login: function() {
                this.msg='';
                var loginUrl= 'http://csse-s365.canterbury.ac.nz:4888/api/v2/users/login?username='+this.loginModel.username+'&email='+this.loginModel.email+'&password='+this.loginModel.password;
                //     var jsonfile2={"username":this.loginModel.username,"email":this.loginModel.email,"password":this.loginModel.password}
                this.$http.post(loginUrl)
                    .then((response) => {
                        this.msg = 'Hi '+this.loginModel.username+', you are logged in!';
                        this.userName = this.loginModel.username;
                        this.email = this.loginModel.email;
                        sessionStorage.setItem('email', this.email);
                        sessionStorage.setItem('token', response.data.token)
                        sessionStorage.setItem('userName', this.userName)
                        sessionStorage.setItem('userid',response.data.id);
                      //  alert(response.data.id);
                      //  alert(sessionStorage.getItem('userid'));
                      //  alert(sessionStorage.getItem('token'));


                        window.location.href = '/projects';

                    }).catch((response) => {
                    this.msg = 'Invalid username or password';
                })
            },
            logout: function() {
                this.msg='';
                var logoutUrl = 'http://csse-s365.canterbury.ac.nz:4888/api/v2/users/logout';
                var headers = {'x-authorization': sessionStorage.getItem('token')};
                $.ajax({
                    type:'POST',
                    dataType:'text',
                    url: logoutUrl,
                    headers:headers,
                    success:function(response){
                        alert("logout successful");
                        this.msg="you are logged out";
                        this.userName='';
                        this.email='';
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

            }

        }
    }
</script>

<style>
  #register{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height:300px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: darkseagreen;
  }
  #login{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
    background-color: antiquewhite;
    height: 300px;
  }
  .account-info{
    text-align: center;
    margin-top: 10px
  }
  #backtohome{
    margin-top: 10px;

  }
  #viewprojects{
    margin-top: 10px;

  }

</style>