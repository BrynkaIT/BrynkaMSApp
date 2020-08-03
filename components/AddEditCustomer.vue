<template>
  <div class="container">
    <form-wizard
      :title="formToOpen.title"
      shape="tab"
      class="mt-2"
      color="#e67e22"
      subtitle="Create or Edit a Customer"
    >
  <tab-content title="Basic Information" >
   <div class="container">
     <b-form-group label="Name" label-for="input-1">
        <b-form-input
          v-model="form.name"
          type="text"
          required
          placeholder="Customer / Account Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Possessive Name" label-for="input-2">
        <b-form-input
        v-model="form.possessiveName"
         type="text"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Parent Customer" label-for="input-3">
        <b-form-select
          v-model="form.parentCustomers"
          :options="parent"
          :value="'Brynka'"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Contact" label-for="input-3">
        <b-form-input
          v-model="form.contact"
          required
          placeholder="Enter Contact Rep"
        ></b-form-input>
      </b-form-group>
   </div>
  </tab-content>
  <tab-content title="Location">
     <b-form-group
        label-cols-lg="3"
        label="Main Location Address"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          label-cols-sm="3"
          label="Street:"
          label-align-sm="right"
          label-for="nested-street"
        >
          <b-form-input
           ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label=""
          label-align-sm="right"
          label-for="nested-street"
        >
          <b-form-input
            placeholder="Apt/Suite"
          ></b-form-input>
        </b-form-group>
        <!-- -->
        <b-form-group
          label-cols-sm="3"
          label=""
          label-align-sm="right"
          label-for=""
        >
          <b-row>
            <b-col sm="4">
              <b-form-input
              placeholder="City"
              class="m-1">
              </b-form-input>
            </b-col>
            <b-col sm="4">
               <b-form-select class="m-1" >
                 <template v-slot:first>
                  <b-form-select-option :value="null" disabled>State</b-form-select-option>
                </template>
               </b-form-select>
            </b-col>
            <b-col sm="4">
              <b-form-input

              placeholder="Zip"
              class="m-1">
              </b-form-input>
            </b-col>
          </b-row>
        </b-form-group>
        <!-- -->

        <b-form-group
          label-cols-sm="3"
          label="Country:"
          label-align-sm="right"
          label-for="country"
        >
          <b-form-input
           class="m-1">
          ></b-form-input>
        </b-form-group>
      </b-form-group>
   </tab-content>
   <tab-content title="Technical Settings">
     <b-row>
        <b-col>
          <b-form-group label="DbName:" label-for="input-2">
            <b-form-input
              v-model="form.dbName"
              required
              placeholder="Enter Database Name"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email-Domain">
            <b-form-input

              required
              placeholder="Enter Email Domain"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sub-Domain">
            <b-form-input

              required
              placeholder="Enter Sub-Domain Name"
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
            <b-form-select

            multiple :select-size="3"
            :options="ASUEDomainFiltersOptions"
            v-model="form.automaticSignUpEmailDomainFilters"
            required
            >
            </b-form-select>
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
          <b-form-group label="Default Security Role Model">
            <b-form-select

            :options="DSRoleModelOptions"
            v-model="form.defaultSecurityRoleModel"
            required>
            </b-form-select>
          </b-form-group>
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
export default {
components: {
    FormWizard,
    TabContent
  },
  computed: {
    ...mapState({
      // locations: state => state.locations.locations,
      // buildings: state => state.buildings.buildings,
      // floors: state => state.floors.floors,
      // departments: state => state.departments.departments,
      // securityRoles: state => state.securityRoles.securityRoles,
      formToOpen: state => state.formToOpen
    })
  },
  data(){
    return {
      form:{
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters:'',
        dbName:'',
        defaultSecurityRole: '',
        defaultSecurityRoleModel:'',
        emailDomain:'',
        imageFolder: '',
        logoPath: '',
        parentCustomers: [],
        modules: [],
        name: '',
        possessiveName: '',
        subFolder: '',
        contact:''
      },
       moduleOptions: ['Receiving', 'Shipping', 'Jobsubmission'],
      AASignupOptions:[
        { value: 'false', text: 'No' },
        { value: 'true', text: 'Yes' },
      ],
      ASUEDomainFiltersOptions:[
        { value: 'b1', text: 'blah1' },
        { value: 'b2', text: 'blah2' },
        { value: 'b3', text: 'blah3' },
      ],
      DSRoleModelOptions:[
        { value: 'SecurityRole', text: 'SecurityRole' },
        { value: 'MSSecurityRole', text: 'MSSecurityRole' },
        { value: 'APISecurityRole', text: 'APISecurityRole' },
      ],
      parent:["TMG", "Prudential", "Cushman-Wakefield", "Brynka"]
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

</style>
