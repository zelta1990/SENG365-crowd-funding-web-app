<template>
  <div>
    <div v-if="errorFlag" style="color:red";>
      {{error}}
    </div>

    <div v-if="$route.params.userId">
      <div id = "user">
        <router-link :to="{ name: 'AppNav'}">Back to Users</router-link>
        <br /><br />
        <table>
          <tr>
            <td>User ID</td>
            <td>Username</td>
            <td>location</td>
            <td>email</td>
          </tr>
          <tr>
            <td>{{ $route.params.userId}}</td>
            <td>{{ getSingleUser($route.params.userId).username}}</td>

          </tr>
        </table>
      </div>
    </div>

  </div>
</template>
<script>
    export default{
        data(){
            return{
                error:"",
                errorFlag:false,
                users:[]
            }
        },
        mounted:function(){
            this.getSingleUser();
        },
        methods:{
            getSingleUser: function(id){
                for(var i=0;i<=this.users.length;i++){
                    if(this.users[i].user_id==id){
                        return this.users[i];
                    }
                }
            }
        }
    }
</script>