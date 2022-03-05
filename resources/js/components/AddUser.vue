<template>
    <div class="card">
        <div class="card-header">
            User Add
        </div>
        <div class="card-body">
            <form @submit.prevent="submit" class="needs-validation" novalidate="novalidate">
                <div class="row">
                    <div class="col-12 col-md-12" >
                        First Name:<input type="text" class="form-control" 
                        :class="errors && errors.first_name? 'is-invalid': '' " 
                        v-model="fields.first_name">
                        <div v-if="errors && errors.first_name" class="invalid-feedback">
                            {{ errors.first_name[0] }}
                        </div>
                    </div>
                    <div class="col-12 col-md-12 form-group">
                        Last Name:<input type="text" class="form-control" 
                        :class="errors && errors.last_name? 'is-invalid': '' "  
                        v-model="fields.last_name">
                        <div v-if="errors && errors.last_name" class="invalid-feedback">
                                {{ errors.last_name[0] }}
                        </div>
                    </div>
                    <div class="col-12 col-md-12" >
                        Email:<input type="text" class="form-control" 
                        :class="errors && errors.email? 'is-invalid': '' " 
                        v-model="fields.email">
                        <div v-if="errors && errors.email" class="invalid-feedback">
                            {{ errors.email[0] }}
                        </div>
                    </div>
                    <div class="col-12 col-md-12">
                        Birth date:<input type="date" class="form-control" 
                        :class="errors && errors.birth_date? 'is-invalid': '' " 
                        v-model="fields.birth_date">
                        <div v-if="errors && errors.birth_date" class="invalid-feedback">
                                {{ errors.birth_date[0] }}
                        </div>
                    </div>
                    <div class="col-12 col-md-12">
                        Password:<input type="text" class="form-control" 
                        :class="errors && errors.password? 'is-invalid': '' " 
                        v-model="fields.password">
                        <div v-if="errors && errors.password" class="invalid-feedback">
                            {{ errors.password[0] }}
                        </div>
                    </div>         
                </div><!--row-->
                    
                <button type="submit" class="btn btn-primary mt-2">
                    Add User
                </button>
            </form>
        </div><!--card-body-->
    </div><!--card-->
</template>

<script>
export default {
   props: ["errors"],
    data(){
        return {
            fields: {},
        }
    },

    methods:{
        submit(){
            this.$emit('addUser',{
                fields: this.fields,
            });  
            this.fields = {};
        },



    }
}
</script>