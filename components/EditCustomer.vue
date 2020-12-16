<template>
  <div class="container">

    <b-card :title="`Edit customer: ${customerToEditName }`" style="max-width:900px">
      <b-form>
        <div class="container">

            <b-form-group label="Automatic Signup">
              <b-form-select
                :options="AASignupOptions"
                v-model="form.allowsAutomaticSignup"
                required
              >
              </b-form-select>
            </b-form-group>

            <b-form-group label="Automatic Signup Email Domain Filters">
              <b-form-tags v-model="form.automaticSignUpEmailDomainFilters">
              </b-form-tags>
            </b-form-group>

            <b-form-group label="Default Security Role">
              <b-form-select
                :options="securityRoles"
                v-model="form.defaultSecurityRole"
                 value-field="_id"
                text-field="name"
                required
              >
              </b-form-select>
            </b-form-group>
          <b-form-row>
            <b-form-group label="Logo">
              <b-form-file
                v-model="form.image"

                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ref="image"
                accept="image/*"
                @change="previewImage($event)"
              ></b-form-file>
              <div>
              <b-img
                style="max-width:50%"
                :src="imagePlaceholder"
                fluid
                alt="Responsive image"
              ></b-img>
            </div>
            </b-form-group>
        </b-form-row>
          <div class="text-right">
            <b-button @click="$store.commit('closeModal')" variant="outline-secondary">Cancel</b-button>
          <b-button @click="onSubmit" variant="primary">Submit</b-button>
          </div>
        </div>
      </b-form>
    </b-card>

  </div>
</template>

<script>


import { mapState } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      customers: state => state.customers.customers,
      securityRoles: state => state.securityRoles.securityRoles,

      formToOpen: state => state.formToOpen
    }),
     baseUrl(){
      return process.env.baseURL
    }
  },

  created() {

    if (this.formToOpen.data) {
      this.isCustomerToEdit = true
      this.populateCustomer(this.formToOpen.data)
    }
  },
  data() {
    return {
      startIndex: 0,
      customerToEdit: false,
      customerToEditId: '',
      customerToEditName: '',
      form: {
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters: [],
        defaultSecurityRole: null,
        image: null,
      },
      AASignupOptions: [ { value: 'false', text: 'No' },{ value: 'true', text: 'Yes' }],
      isCustomerToEdit: false,
      customerToEdit: false,
      imagePlaceholder: ''
    }
  },
  methods: {
    async populateCustomer(customer) {
      this.customerToEdit = true
      this.customerToEditId = customer._id
      this.customerToEditName = customer.name || ''
      this.imagePlaceholder = process.env.baseURL + customer.logoUrl || ''
      this.form.allowsAutomaticSignup = customer.allowsAutomaticSignup
      this.form.automaticSignUpEmailDomainFilters = customer.automaticSignUpEmailDomainFilters
      this.form.defaultSecurityRole  = customer.defaultSecurityRole || ''
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
    },

    async onSubmit() {

      let formData = new FormData()

      formData.append('allowsAutomaticSignup', this.form.allowsAutomaticSignup)
      formData.append('defaultSecurityRole', this.form.defaultSecurityRole)
      if (this.form.image != null) formData.append('image', this.form.image)
      if (this.form.automaticSignUpEmailDomainFilters != null) {
        for (var i = 0; i < this.form.automaticSignUpEmailDomainFilters.length; i++) {
          formData.append("automaticSignUpEmailDomainFilters", this.form.automaticSignUpEmailDomainFilters[i])
        }
      }

      try {
        debugger
        const res = await this.$axios.$patch(`/manage/customers/${this.customerToEditId}` , formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.$emit('refreshCustomer')
        this.$store.commit('closeModal')
        this.$brynkaToast(res.message, 'success')
      } catch (error) {
      this.$brynkaToast(error, 'danger')
      }
    }
  }
}
</script>

<style>

</style>
