<template>
    <div>
        <div id="newproject">

            <!--end of log out-->
            <div class="container">
                <h2>Start a project</h2>
                <div class="form-group">
                    <label>title</label>
                    <input type="text" id="title" v-model="newProject.title" />
                </div>
                <div class="form-group">
                    <label>subtitle</label>
                    <input type="text" id ="subtitle" v-model="newProject.subtitle" />
                </div>
                <div class="form-group">
                    <label>description</label>
                    <input type="text" id="description" v-model="newProject.description" />
                </div>
                <div class="form-group">
                    <label>reward amount</label>
                    <input type="number" id="reward amount" min="0" step="10" value="0" v-model="newProject.rewardAmount" />
                </div>
                <div class="form-group">
                    <label>reward description</label>
                    <input type="text" id="reward description" v-model="newProject.rewardDescription" />
                </div>
                <div class="form-group">
                    <label>target</label>
                    <input type="number" id = "target" min="0" step="10" value="0" v-model="newProject.target" />
                </div>
             <!--   <div class="form-group">
                    <label>imageUri</label>
                    <input type="file" id = "image" v-model="newProject.image" />
                    <input type="submit" name="submit_image" value="Upload">
                </div>-->
                <div class="form-group">
                    <label></label>
                    <button class = "btn btn-primary" @click="submitProject()">Submit</button>
                </div>

            </div>
            <div id="backtoprojects">
                <router-link class ="btn btn-info" to="/projects">Back to projects</router-link>
            </div>
            <div id="submitMessage">
                {{ submitMessage }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                newProject: {
                    title: "",
                    subtitle: "",
                    creators: [],
                    creationDate: "",
                    description: "",
                    rewardAmount: 0,
                    rewardDescription: "",
                    target: 0,
                    image: "",
                },
                submitMessage:""

            }
        },

        methods: {
            submitProject: function() {
                this.newProject.creators.push({"id":parseInt(sessionStorage.getItem('userid'))});
                var rewards=[];
                rewards.push({"amount":parseInt(this.newProject.rewardAmount),"description": this.newProject.rewardDescription});
                var formData = {"title": this.newProject.title, "subtitle": this.newProject.subtitle, "description": this.newProject.description, "target": parseInt(this.newProject.target), "creators": this.newProject.creators, "rewards": rewards};
                var headers = {'x-authorization': sessionStorage.getItem('token')};
                var publishUrl='http://csse-s365.canterbury.ac.nz:4888/api/v2/projects';
                    this.$http.post(publishUrl, formData,{headers:headers})
                        .then((response) => {
                            this.submitMessage='Submit successful!';
                        }).catch((response) => {
                            this.submitMessage="Submit unsuccessful!";
                        })


            }
        }
    }
</script>

<style>
    #newproject{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
        height: 740px;
        background-color: darkseagreen;
    }


</style>