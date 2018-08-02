<template>
    <div id="main">
        <h2 class="text-center">Hi {{this.userName}}, welcome to crowdfunding App</h2>

        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div v-if="$route.params.id" >
            <div id="project">
                <router-link id="backtoprojects" class ="btn btn-success" to="/projects">Back to projects</router-link>
                <!--projects status  toggle-->
                <div id="toggle" v-if="userid==result.creators[0].id">
                    <toggle-button :value="true" :labels="{checked: 'Open', unchecked: 'Closed'}" @change="updateProjectStatus(result)"/><p>{{updateMsg}}</p>
                </div>
                <!------pledge------------>
                <div id="pledge" v-if="token && userid!=result.creators[0].id">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pledgeModal">
                        pledge
                    </button>
                </div>
                <!-------pledge modal---->
                <div class="modal fade" id="pledgeModal" tabindex="-1" role="dialog" aria-labelledby="pledgeModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-header">
                            <h5 class="modal-title" id="pledgeModalLable">Make a pledge to this project</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>amount</label>
                                <input type="number" id="pledgeAmount" v-model="pledge.amount" />
                            </div>
                            <div class="form-group" id="anonymous">
                                <label>anonymous</label>
                                <select v-model="pledge.anonymous">
                                    <option disabled value="">Please select one</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Card number</label>
                                <input type="text" id="card" v-model="pledge.card" />
                            </div>
                            <div class="form-group">
                                <label></label>
                                <button class = "btn btn-primary" data-dismiss="modal"v-on:click="submitPledge()">Submit</button>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                close
                            </button>
                        </div>
                    </div>
                </div>
                <!--end of pledge modal-->
                <br/><br/>
                <table class = "table table-bordered">
                    <thead>
                    <tr class="info">
                        <th>Project ID</th>
                        <th>Project Title</th>
                        <th>Project Subtitle</th>
                        <!--    <th>Project Status</th>-->
                        <th>Creators</th>
                        <th>Creation date</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{ $route.params.id }}</td>
                        <td>{{ result.title }}</td>
                        <td width = 150>{{ result.subtitle }}</td>
                        <!--  <td >{{ result.open }}</td>-->

                        <td><div v-for="creator in result.creators">id: {{creator.id}} name:{{ creator.username }}</div></td>
                        <td>{{ result.creationDate }}</td>
                        <td style="width:100%;max-height:300px;overflow:auto">{{ result.description }}</td>
                    </tr>
                    </tbody>
                </table>
                <table class = "table table-bordered">
                <thead>
                    <tr class="info">
                        <th>Rewards</th>
                        <th>Target</th>
                        <th>Progress</th>
                        <th>Backers</th>
                    </tr>
                </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div style="width:100%;max-height:150px;overflow:auto" v-for="reward in result.rewards">
                                id: {{ reward.id }}<br> amount:{{reward.amount}}<br> description:{{reward.description}}
                            </div>
                        </td>
                        <td>{{ result.target }}</td>
                        <td>Number of backers: {{result.progress.numberOfBackers}}<br>Current pledged: {{ result.progress.currentPledged}}</td>
                        <td>
                            <div style="width:100%;max-height:150px;overflow-y:auto" v-for="backer in result.backers">
                                backer name: {{backer.username}}<br>amount: {{backer.amount}}

                             <!--   backer id:{{result.backers[i].id}}backer name:{{result.backers[i].username}}<br>amount: {{result.backers[i].amount}}-->
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h2>Project Image</h2>
                <img v-bind:src ="'http://csse-s365.canterbury.ac.nz:4888/api/v2'+result.imageUri" width="400" heigth="400" alt="Project image"/>
                <div v-if="!image && userid==result.creators[0].id">
                    <h4>Upload an image</h4>
                    <input type="file" @change="onFileChange">
                </div>
                <div v-else-if="image && userid==result.creators[0].id">
                    <img :src="image" />
                    <button @click="removeImage">Remove image</button>
                </div>
            </div>
        </div>
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
                message:"",
                searchText:"",
                updateMsg:'',
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
            this.getSingleProject(this.$route.params.id);
        },
        methods:{

            getSingleProject: function(id){
                this.$http.get('http://csse-s365.canterbury.ac.nz:4888/api/v2/projects/'+id)
                    .then(function(response) {
                        this.result = response.data;
                    },function(error){
                        this.error=error;
                        this.errorFlag=true;
                    });
            },

            updateProjectStatus:function(result){
                //  alert(this.userid);
                var projectId=this.result.id;
                var status = this.result.open;
                var url='http://csse-s365.canterbury.ac.nz:4888/api/v2/projects/'+projectId;
                if(status==true) {
                    var data = {"open":false};
                }else{
                    var data = {"open":true};
                }
                var headers = {'x-authorization': sessionStorage.getItem('token')};
                this.$http.put(url,data, {headers:headers})
                    .then(function(response) {
                        this.updateMsg='Project is closed';
                        document.getElementById('toggle').style.pointerEvents = 'none'; //disable toggle after closing project
                    },function(error){
                        this.updateMsg='Failed to close project';
                    });

            },

            submitPledge:function(){
             //   alert(this.userid);
                var projectId=parseInt(this.result.id);
                var url='http://csse-s365.canterbury.ac.nz:4888/api/v2/projects/'+projectId+'/pledge';
                var pledgeToken=sessionStorage.getItem('token')
             //   alert(sessionStorage.getItem('token'));

                var headers = {'x-authorization': pledgeToken};
                if(this.pledge.anonymous=="Yes"){
                    var anonymous=true;
                }else{
                    var anonymous=false;
                }
                var formData = {"id": projectId, "amount": parseInt(this.pledge.amount), "anonymous": anonymous, "card": {"authToken":this.pledge.card}};
                this.$http.post(url,formData,{headers:headers})
                    .then(function(response) {
                        alert("Pledge successful");
                        window.location.reload();

                    },function(error){
                        alert(error.data);
                    });

            },
            onFileChange(e) {                       //upload image example by https://codepen.io/Atinux/pen/qOvawK
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            }
        }

    }
</script>

<style>
    #main{
        margin-top: 0px;
    }

    #toggle{
        margin-top:5px;
        margin-left:15px;

    }
    #pledge{
        margin-top:5px;
        margin-left:15px;

    }
   #backtoprojects{
        margin-left:10px;
    }
    #pledgeModal{
        background-color: beige;
        width:70%;
        height:50%;

    }
    #pledgeModal.modal-dialog  {width:75%;}

</style>