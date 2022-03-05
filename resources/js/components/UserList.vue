<template>

<!-- Update Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
            <div class="card">
                <div class="card-header">
                    User Update
                </div>
                <div class="card-body" >
                <form @submit.prevent="userUpdate" class="needs-validation" novalidate="novalidate">
                  <div class="row">
                      <input type="hidden" v-model="fields.id">
                        <div class="col-12 col-md-12" >
                            First Name:<input type="text" class="form-control" 
                            :class="updateErrors && updateErrors.first_name? 'is-invalid': '' " 
                            v-model="fields.first_name">
                            <div v-if="updateErrors && updateErrors.first_name" class="invalid-feedback">
                                 {{ updateErrors.first_name[0] }}
                            </div> 
                        </div>
                        <div class="col-12 col-md-12">
                            Last Name:<input type="text" class="form-control" 
                            :class="updateErrors && updateErrors.last_name? 'is-invalid': '' " 
                            v-model="fields.last_name">
                            <div v-if="updateErrors && updateErrors.last_name" class="invalid-feedback">
                                 {{ updateErrors.last_name[0] }}
                            </div>
                        </div>
                        <div class="col-12 col-md-12" >
                             Email:<input type="text" class="form-control" 
                             :class="updateErrors && updateErrors.email? 'is-invalid': '' " 
                             v-model="fields.email">
                            <div v-if="updateErrors && updateErrors.email" class="invalid-feedback">
                                {{ updateErrors.email[0] }}
                            </div>
                        </div>
                         <div class="col-12 col-md-12">
                              Birth date:<input type="date" class="form-control" 
                              :class="updateErrors && updateErrors.birth_date? 'is-invalid': '' "
                               v-model="fields.birth_date">
                              <div v-if="updateErrors && updateErrors.birth_date" class="invalid-feedback">
                                  {{ updateErrors.birth_date[0] }}
                              </div>
                        </div>
                        <div class="col-12 col-md-12">
                              Password:<input type="text" class="form-control" 
                              :class="updateErrors && updateErrors.password? 'is-invalid': '' " 
                              v-model="fields.password">
                              <div v-if="updateErrors && updateErrors.password" class="invalid-feedback">
                                  {{ updateErrors.password[0] }}
                              </div>
                        </div>
                    </div><!--row-->
                         <div class="alert alert-success" v-if="success">
                               User updated successfully.
                         </div>
                         <button type="submit" class="btn btn-success mt-3"  v-if="!success">Update</button>
                          <button type="button" class="btn btn-primary mt-3" @click="forSuccess()" data-bs-dismiss="modal">Close</button>   
                  </form>
                </div><!--card-body-->
            </div><!--card-->
      </div>
    </div>
  </div>
</div><!--end update modal-->


<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Are you sure you want to delete <b>{{this.selectedDeleteName}} {{this.selectedDeleteLastName}}</b>?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" @click="userDelete" data-bs-dismiss="modal">Yes</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div><!--end delete modal -->

        <!------------------TABLE---------------------->
        <div class="card">
            <div class="card-header">
                User List
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                         <tr>
                            <th>ID Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user,index) in users" :key="index">
                            <td>{{user.id}}</td>
                            <td>{{user.first_name}} {{user.last_name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.userAge}}</td>
                            <td>
                              <button type="button" class="btn btn-success" 
                                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                                  @click.prevent="userEdit(user.id)">
                                  Edit
                              </button>
                              <button type="button" class="btn btn-danger" 
                                  data-bs-toggle="modal" data-bs-target="#deleteModal"
                                  @click.prevent="userDetailsDelete(user.id,user.first_name,user.last_name)">
                                  Delete
                              </button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div><!--card-body-->
        </div><!--card-->
        
</template>

<script>

export default {
   props: ["users","updateErrors","success"],

    data(){
        return {
            selectedDeleteId:'',
            selectedDeleteName:'',
            selectedDeleteLastName:'',
            editId:'',
            fields:{},
        }
    },
    methods:{

          userEdit(userId){
                this.editId = userId
                axios.get('/user_edit/'+userId).then((response)=>{  
                  this.fields = response.data                 
                })
          },

          forSuccess(){
                 this.$emit('toggleSuccess'); 
          },

          userUpdate(){
                this.$emit('updateUser',{
                  fields: this.fields,
                });                      
          },

          userDetailsDelete(userId, userName, userLastName){
                this.selectedDeleteId=userId
                this.selectedDeleteName=userName
                this.selectedDeleteLastName=userLastName
          },

          userDelete(){
                this.$emit('deleteUser',{
                    id: this.selectedDeleteId
                }); 
          }

    }
}
</script>