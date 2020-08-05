<template>
  <div class="container">
    <form-wizard
      :title="formToOpen.title"
      shape="tab"
      class="mt-2"
      color="#e67e22"
      subtitle="Create or Edit a Customer"
      @on-complete="onSubmit"
      :startIndex="startIndex"
    >
  <tab-content title="Basic Information" :before-change="validateTab1">
   <div class="container">
     <b-form-group label="Name" label-for="input-1">
        <b-form-input
          v-model="form.name"
          :class="{ 'validation-error': $v.form.name.$error }"
          type="text"
          required
          placeholder="Customer / Account Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Possessive Name" label-for="input-2">
        <b-form-input
        v-model="form.possessiveName"
        :class="{ 'validation-error': $v.form.possessiveName.$error }"
         type="text"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Sub-Folder">
            <b-form-input
              v-model="form.subFolder"
              :class="{ 'validation-error': $v.form.subFolder.$error }"
              required
              placeholder="Enter Sub-Folder Name"
            ></b-form-input>
          </b-form-group>
      <b-form-group>
        <label for="">Parent Customer(s): <b-badge variant="primary" class="mx-1" pill v-for="(parent, index) in parents" :key="index">{{ parent }} <b-icon href="#" variant="light" scale="1.2" icon="x-circle-fill" @click="deletePC(index)"></b-icon></b-badge></label>
        <b-form-select
          v-model="c"
          :options="customers"
          value-field="_id"
          text-field="name"
          multiple
          :select-size="3"
          @input="displaySelectedCustomerParents($event)"
        ></b-form-select>

      </b-form-group>

   </div>
  </tab-content>

  <tab-content title="Technical Settings" :before-change="validateTab2">
     <b-row>
        <b-col>
          <b-form-group label="DbName:" label-for="input-2">
            <b-form-input
              v-model="form.dbName"
              :class="{ 'validation-error': $v.form.dbName.$error }"
              required
              placeholder="Enter Database Name"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email-Domain">
            <b-form-input
              v-model="form.emailDomain"
              :class="{ 'validation-error': $v.form.emailDomain.$error }"
              required
              placeholder="Enter Email Domain"
            ></b-form-input>
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Automatic Signup">
            <b-form-select

            :options="AASignupOptions"
            v-model="form.allowsAutomaticSignup"
            required>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Automatic Signup Email Domain Filters">
            <b-form-tags
            v-model="form.automaticSignUpEmailDomainFilters"
            >
            </b-form-tags>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Image Folder">
            <b-form-input
            v-model="form.imageFolder"
            :class="{ 'validation-error': $v.form.imageFolder.$error }"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Logo Path">
            <b-form-input
            v-model="form.logoPath"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

  </tab-content>

   <tab-content title="Security Settings">

          <b-form-group label="Modules">
            <b-form-checkbox-group
            :options="moduleOptions"

            v-model="form.modules"
              switches
              stacked
            ></b-form-checkbox-group>
          </b-form-group>

          <b-form-group label="Default Security Role Model">
            <b-form-select
            :class="{ 'validation-error': $v.form.defaultSecurityRoleModel.$error }"
            :options="DSRoleModelOptions"
            v-model="form.defaultSecurityRoleModel">
            </b-form-select>
          </b-form-group>


   </tab-content>
</form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
components: {
    FormWizard,
    TabContent
  },
  computed: {
    ...mapState({
      customers: state => state.customers.customers,
      securityRoles: state => state.securityRoles.securityRoles,
      USAStates: state =>state.usStates.usaStates,
      formToOpen: state => state.formToOpen
    })
  },
  validations: {
    form: {
      name: {
        required
      },
      subFolder: {
        required
      },
      possessiveName:{
         required
      },
      dbName: {
        required
      },
      emailDomain: {
        required
      },
      imageFolder: {
        required
      },
      defaultSecurityRoleModel: {
        required
      },
    }
  },
  data(){
    return {
      startIndex: 0,
      form:{
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters:[],
        dbName:'',
        defaultSecurityRole: null,
        defaultSecurityRoleModel:'SecurityRole',
        emailDomain:'',
        imageFolder: '',
        logoPath: '',
        parentCustomers: [],
        modules: [],
        name: '',
        possessiveName: '',
        subFolder: ',

      },
      moduleOptions: ['Receiving', 'Shipping', 'Jobsubmission'],
      AASignupOptions:[{ value: 'false', text: 'No' }, { value: 'true', text: 'Yes' }],
      DSRoleModelOptions:[
        // { value: null, text: 'Please select an option' },
        { value: 'SecurityRole', text: 'SecurityRole' },
        { value: 'AdvancedSecurityRole', text: 'AdvancedSecurityRole' },
        { value: 'APISecurityRole', text: 'APISecurityRole' },
      ],
      c:[],
      parents:[]
    }

  },
  methods: {
    async displaySelectedCustomerParents(id) {
         const { customers } = await this.$axios.$get(`/customers?id=${id[0]}`)
          if(this.parents.some(parent => parent == customers[0].name)){
            return alert('Customer already selected')
          }
          this.parents.push(customers[0].name)
          this.form.parentCustomers.push(customers[0]._id)

    },
    deletePC(index){
      if (index > -1) {
        this.parents.splice(index, 1);
        this.form.parentCustomers.splice(index, 1);
      }
    },
    validateTab1(){
      this.$v.form.name.$touch()
      this.$v.form.subFolder.$touch()
      this.$v.form.possessiveName.$touch()
      if (!this.$v.form.name.$invalid && !this.$v.form.subFolder.$invalid && !this.$v.form.possessiveName.$invalid) {
        return true
      } else {
        return false
      }
    },
     validateTab2(){
      this.$v.form.dbName.$touch()
      this.$v.form.emailDomain.$touch()
      this.$v.form.imageFolder.$touch()

      if (!this.$v.form.dbName.$invalid &&
      !this.$v.form.emailDomain.$invalid &&
      !this.$v.form.imageFolder.$invalid) {
        return true
      } else {
        return false
      }
    },
    async onSubmit(){
      this.$v.form.defaultSecurityRoleModel.$touch()
      if(!this.$v.form.$invalid){
        const res = await this.$store.dispatch('customers/postCustomer', this.form)
          debugger
        if(res != undefined){
          this.$emit('refreshCustomers')
          this.$store.commit('closeModal')
          this.$toasted.success(res.message, {
            position: "top-center",
            duration : 5000
            })
        }else{
          this.$toasted.error("Something went wrong! Please try again", {
            position: "top-center",
            duration : 5000
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.vue-form-wizard {
  padding-bottom: 20px;
  border: 1px solid #ccc;
  background: #fafafa;
  padding: 10px;
  border-radius:5px;
}
.vue-form-wizard .nav-link {
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-align-items: center;
  align-items: center;
  white-space: nowrap;
  padding: 0.8rem 1.188rem;
  color: #a3a3a3 !important;
  -webkit-transition-duration: 0.45s;
  -moz-transition-duration: 0.45s;
  -o-transition-duration: 0.45s;
  transition-duration: 0.45s;
  transition-property: color;
  -webkit-transition-property: color;
  height: 46px;
  padding-left: 30px;
}

.vue-form-wizard .nav-link:hover,
.menu-icon:hover {
  color: #000 !important;
  background: none !important;
}
.vue-form-wizard .wizard-header {
  background: #eee;
  margin-bottom: 5px;
}
.vue-form-wizard .wizard-card-footer {
  margin-top: 5px;
  background: #eee;
  padding: 15px;
}
.validation-error {
  border: 1px solid #f44336;
  color: red;
}
.validation-error::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}

.validation-error:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}

@media(min-width:1200px){
  .vue-form-wizard{
    width: 80%;
    margin: auto;
  }
}
</style>
