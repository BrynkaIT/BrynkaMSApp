<template>
  <div>
    <h5>Basic Information</h5>
    <b-form>
      <b-form-group label="Name" label-for="input-1">
        <b-form-input
          @input="emitFormData"
          v-model="form.CustomerName"
          type="text"
          required
          placeholder="Customer / Account Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Internal Code" label-for="input-2">
        <b-form-input v-model="form.code" required placeholder="">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Type" label-for="input-3">
        <b-form-select
          v-model="form.selectedCustomerType"
          :options="CustomerTypes"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Contact" label-for="input-3">
        <b-form-input
          @input="emitFormData"
          v-model="form.contact"
          required
          placeholder="Enter Contact Rep"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: {
        CustomerName: '',
        code: '',
        selectedCustomerType: '',
        contact: ''
      },
      selectedCustomerType: null,
      CustomerTypes: [
        { value: null, text: 'Please select an option' },
        { value: 'corporation', text: 'Corporation' },
        { value: 'school', text: 'School' },
        { value: 'NPO', text: 'Non-Profit Organization' },
        { value: 'Government', text: 'Government' }
      ]
    }
  },
  validations: {
    form: {
      CustomerName: {
        required
      },
      contact: {
        required
      }
    }
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
