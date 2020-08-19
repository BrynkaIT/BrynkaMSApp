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
  <tab-content title="Basics" :before-change="validateTab1">
   <div class="container">
     <b-form-group label="Name" label-for="input-1">
        <b-form-input
          v-model="form.name"
          :class="{ 'validation-error': $v.form.name.$error }"
          type="text"
          @input="proccessCustomerName()"
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

   <tab-content title="Contact Info">
     <h5 class="font-weight-bolder text-primary">Main Location</h5>

     <div class="form-group">
    <label for="inputAddress">Street</label>
    <input type="text" class="form-control" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Street 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select
      :options="states"
      v-model="form.address.state"
      text-field="name"
      value-field="abbreviation"
      class="form-control">
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <h5 class="font-weight-bolder text-primary">Contacts</h5>

  <div class="mb-2">
    <span>Sales Contact</span>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input type="text" class="form-control" placeholder="name">
        </div>
        <div class="form-group col-md-4">
          <input type="text" class="form-control" placeholder="Phone">
        </div>
        <div class="form-group col-md-2">
          <input type="text" class="form-control" placeholder="email">
        </div>
      </div>
  </div>
  <div class="mb-2">
    <span >IT Contact</span>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input type="text" class="form-control" placeholder="name">
        </div>
        <div class="form-group col-md-4">
          <input type="text" class="form-control" placeholder="Phone">
        </div>
        <div class="form-group col-md-2">
          <input type="text" class="form-control" placeholder="email">
        </div>
      </div>
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
          <b-form-group label="Logo">
            <b-form-file
              v-model="form.image"
              :state="Boolean(form.image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              ref="image"
              accept="image/*"
              @change="previewImage($event)"
    ></b-form-file>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Modules">
            <b-form-checkbox-group
            :options="moduleOptions"
            v-model="form.modules"
              switches
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
        <b-col>
          <div>
            <b-img :src="imagePlaceholder" fluid alt="Responsive image"></b-img>
          </div>
        </b-col>
      </b-row>


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
      usaStates: state =>state.usStates.usaStates,
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
   created() {
    this.fetchUSAStates()
      if (this.formToOpen.data) {

      this.isCustomerToEdit = true
      this.populateCustomer(this.formToOpen.data)
    }
  },
  data(){
    return {
      startIndex: 0,
      states: [{ name: 'State' }],
      form:{
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters:[],
        dbName:'',
        defaultSecurityRole: null,
        defaultSecurityRoleModel:'none',
        emailDomain:'',
        imageFolder: '',
        image: '',
        parentCustomers: [],
        modules: [],
        name: '',
        possessiveName: '',
        subFolder: '',
        address:{
          street1:'',
          street2:'',
          city: '',
          state:'',
          postalCode: ''
        }
      },
      moduleOptions: ['Receiving', 'Shipping', 'Jobsubmission'],
      AASignupOptions:[{ value: 'false', text: 'No' }, { value: 'true', text: 'Yes' }],
      isCustomerToEdit:false,
      c:[],
      parents:[],
      imagePlaceholder:''
    }

  },
  methods: {
   async populateCustomer(customer){
       this.form.allowsAutomaticSignup = customer.allowsAutomaticSignup;
        this.form.automaticSignUpEmailDomainFilters = customer.automaticSignUpEmailDomainFilters;
        // this.form.dbName  = customer.dbName;
        // this.form.defaultSecurityRole  = customer.defaultSecurityRole;
        this.form.defaultSecurityRoleModel  = customer.defaultSecurityRoleModel;
        this.form.emailDomain = customer.emailDomain;
        this.form.imageFolder = customer.imageFolder;
        this.imagePlaceholder = customer.imageFolder;
        // this.form.image = customer.image;

        // this.form.parentCustomers = customer.parentCustomers;
        await this.$store.dispatch(`customers/getCustomers`)
        this.displaySelectedCustomerParents(customer.parentCustomers)
        this.form.modules  = customer.modules;
        this.form.name  = customer.name;
        this.form.possessiveName = customer.possessiveName;
        this.form.subFolder = customer.subFolder;
        // this.form.address.street1 = customer.address.street1;
        // this.form.address.street2 = customer.address.street2;
        // this.form.address.city  = customer.address.city;
        // this.form.address.state  = customer.address.state;
        // this.form.address.postalCode = customer.address.postalCode
    },
    proccessCustomerName(){
      this.form.dbName = this.form.name.toLowerCase().replace(/\s/g, '')
      this.form.imageFolder = this.form.name.toLowerCase().replace(/\s/g, '')
      this.form.possessiveName = this.form.name.toLowerCase().concat("'s")
      this.form.subFolder = this.form.name.toLowerCase().replace(/\s/g, '')
    },
    async displaySelectedCustomerParents(id) {

         const { customers } = await this.$axios.$get(`/manage/customers?id=${id[0]}`)
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
    previewImage(e) {

      const files = e.target.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imagePlaceholder = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.imagePlaceholder = files[0]
      }
      // this.user.image = files[0]
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
      this.$v.form.$touch()
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
    },
     fetchUSAStates() {
      this.usaStates.forEach(state => {
        this.states.push(state)
      })
    },
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
