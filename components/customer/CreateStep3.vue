<template>
  <div>
    <h5>Technical Settings</h5>
    <b-form>
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
          <b-form-group label="Email-Domain" label-for="input-3">
            <b-form-input
              v-model="form.emailDomain"
              required
              placeholder="Enter Email Domain"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sub-Domain" label-for="input-3">
            <b-form-input
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
            <b-form-select v-model="form.allowsAutomaticSignup" required>
              <b-form-select-option :value="false">False</b-form-select-option>
              <b-form-select-option :value="true">True</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Automatic SignUpEmail Domain Filters">
            <b-form-select
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
              v-model="form.modules"
              :options="moduleOptions"
              switches
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Default Security Role Model">
            <b-form-select v-model="form.defaultSecurityRoleModel" required>
              <b-form-select-option>...</b-form-select-option>
              <b-form-select-option>---</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters: [],
        defaultSecurityRoleModel: 'SecurityRole',
        modules: [],
        dbName: '',
        emailDomain: '',
        masterCustomers: [],
        name: '',
        subDomain: ''
      },
      moduleOptions: ['Receiving', 'Shipping', 'Jobsubmission']
    }
  }
}
</script>

<style></style>
