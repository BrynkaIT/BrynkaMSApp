<template>
  <div>
    <b-form>
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
          v-model="form.street"
           ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label=""
          label-align-sm="right"
          label-for="nested-street"
        >
          <b-form-input
             v-model="form.street2"
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
               v-model="form.city"
              placeholder="City"
              class="m-1">
              </b-form-input>
            </b-col>
            <b-col sm="4">
               <b-form-select
                v-model="form.state"
                :options="stateOptions"
                class="m-1"
                ></b-form-select>
            </b-col>
            <b-col sm="4">
              <b-form-input
               v-model="form.zip"
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
           v-model="form.country"
           class="m-1">
          ></b-form-input>
        </b-form-group>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import mockData from '@/mockData'
export default {
  data() {
    return {
      form: {
        street: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      stateOptions: [
        { value: null, text: 'State' }
      ]
    }
  },
  created(){
    // const array = this.$store.state.usStates.usaStates;
    // array.forEach(state =>{
    //   this.stateOptions.push(state.name)

    // })
    this.stateOptions = this.$store.state.usStates.usaStates
    // console.log(this.$store.state.usStates.usaStates.name)
  },
  methods: {
    emitFormData() {
      this.$emit('stepUpdated', { data: this.form })
    }
  }
}
</script>

<style></style>
