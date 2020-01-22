<template>
  <div>
    <h5>Technical Settings</h5>
    <b-form>
      <b-row>
        <b-col>
          <b-form-group label="DbName:" label-for="input-2">
            <b-form-input
            @input="emitFormData"
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
            @input="emitFormData"
              v-model="form.emailDomain"
              required
              placeholder="Enter Email Domain"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sub-Domain">
            <b-form-input
            @input="emitFormData"
              v-model="form.subDomain"
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
            @input="emitFormData"
            :options="AASignupOptions"
            v-model="form.allowsAutomaticSignup"
            required>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Automatic Signup Email Domain Filters">
            <b-form-select
            @input="emitFormData"
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
            @input="emitFormData"
            v-model="form.modules"
              switches
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Default Security Role Model">
            <b-form-select
            @input="emitFormData"
            :options="DSRoleModelOptions"
            v-model="form.defaultSecurityRoleModel"
            required>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: {
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters: ['b1'],
        defaultSecurityRoleModel: 'SecurityRole',
        modules: [],
        dbName: '',
        emailDomain: '',
        masterCustomers: [],
        subDomain: ''
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
      ]
    }
  },
  validations: {
    form: {
        dbName: {
          required
        },
        emailDomain: {
          required
        },
        subDomain: {
          required
        }
      },
  },
  computed: {
    isValid() {
      return !this.$v.$invalid
    }
  },
  methods: {
    emitFormData() {
      this.$emit('stepUpdated', { data: this.form, isValid: this.isValid })
    }
  }
}
</script>

<style></style>
