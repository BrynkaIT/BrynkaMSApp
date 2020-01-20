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
          <b-form-group label="Email-Domain" label-for="input-3">
            <b-form-input
            @input="emitFormData"
              v-model="form.emailDomain"
              required
              placeholder="Enter Email Domain"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sub-Domain" label-for="input-3">
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
            <b-form-select @input="emitFormData" v-model="form.allowsAutomaticSignup" required>
              <b-form-select-option :value="false">False</b-form-select-option>
              <b-form-select-option :value="true">True</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Automatic SignUpEmail Domain Filters">
            <b-form-select
            @input="emitFormData"
              v-model="form.automaticSignUpEmailDomainFilters"
              required
            >
              <b-form-select-option>...</b-form-select-option>
              <b-form-select-option>---</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group label="Modules">
            <b-form-checkbox-group
            @input="emitFormData"
              v-model="form.modules"
              :options="moduleOptions"
              switches
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Default Security Role Model">
            <b-form-select
            @input="emitFormData"
            v-model="form.defaultSecurityRoleModel" required>
              <b-form-select-option :value="securityRole">SecurityRole</b-form-select-option>
              <b-form-select-option :value="MSSecurityRole">MSSecurityRole</b-form-select-option>
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
        automaticSignUpEmailDomainFilters: [],
        defaultSecurityRoleModel: '',
        modules: [],
        dbName: '',
        emailDomain: '',
        masterCustomers: [],
        subDomain: ''
      },
      moduleOptions: ['Receiving', 'Shipping', 'Jobsubmission']
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
