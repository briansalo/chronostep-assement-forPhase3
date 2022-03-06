<template>
<div class="container">
    <div class="row">
        <div class="col-md-3">
            <user-add v-on:addUser="addUser" 
                 :errors="errors"
                 :addUserSuccess="addUserSuccess" 
                 >
            </user-add>
        </div>
        <div class="col-md-9">
            <user-list 
                :users="users" 
                :updateErrors="updateErrors"
                :success="success"
                v-on:updateUser="updateUser"
                v-on:deleteUser="deleteUser"
                v-on:toggleSuccess="toggleSuccess"
                v-on:paginate="paginate"
                >
            </user-list>
        </div>    
    </div>
</div>   
    
</template>

<script>

import AddUser from './AddUser'
import UserList from './UserList'

export default {
    components:{       
        'user-list': UserList,
        'user-add': AddUser,
        },

    data(){
        return {
            users:[],
            editusers:[],
            errors:{},
            updateErrors:{},
            success:'',
            addUserSuccess:false,
         }
    },

    created() {
        this.fetchAllUser();

        Echo.private('update-list')
        .listen('UpdateUserList', (e) => {
            this.fetchAllUser();
        });
        },

    methods:{
        fetchAllUser(){
                axios.get('/user_list').then((response)=>{
                   this.users = response.data
                })
        },

        paginate(page){
            axios.get('/user_list?page=' + page.page)
                .then((response)=>{
                   this.users = response.data
                })
        },

        toggleSuccess(){
            this.updateErrors = {};
            this.success = '';
        },
        addUser(datafromemit){
                this.addUserSuccess = false;
                axios.post('/user_save', datafromemit.fields).then(response => {
                    this.addUserSuccess = true;
                    this.errors = {};
                    this.fetchAllUser();
                }).catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                        this.addUserSuccess = false;
                    }
                });
        },    

        updateUser(datafromemit){    
                axios.post('/user_update', datafromemit.fields).then(response => {
                    this.success = 'true';
                    this.updateErrors = {};
                    this.fetchAllUser();
                }).catch(error => {
                    if (error.response.status == 422) {
                        this.updateErrors = error.response.data.errors;
                        this.success = '';
                    }
                });
        },     

        deleteUser(datafromemit){
                axios.get('/user_delete/' + datafromemit.id).then((response)=>{
                     this.fetchAllUser();
                })
        },       

    }
}
</script>