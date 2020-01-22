<template>
  <div>

    <b-card
      title="New Customer"
      footer="Card Footer"
      footer-tag="footer"
      footer-bg-variant="lignt"
      footer-border-variant="light"
      :sub-title="`Step ${activeStep} of 3`"
    >
    <b-progress :value="progress.value" :max="progress.max" :variant="progress.variant" class="mb-3"></b-progress>
      <div class="mt-4">
      <keep-alive>
        <component :is="activeComponent"
        @stepUpdated="mergeFormData"
        />
      </keep-alive>
      </div>
      <template v-slot:footer>
        <div>
           <b-button
              v-if="!isFirstStep"
              squared
              variant="danger"
              @click.prevent="cancelStep"
              >Cancel</b-button
            >
            <b-button
              v-if="!isFirstStep"
              squared
              variant="outline-secondary"
              @click.prevent="previousStep"
              >Back</b-button
              >
            <div class="float-right">
            <b-button
              v-if="!isLastStep"
              squared
              :disabled="!canProceed"
              variant="primary"
              @click.prevent="nextStep"
              >Next</b-button
            >
            <b-button
              v-else
              squared variant="success"
              @click.prevent="submit"
              :disabled="!canSubmit"
            >Submit</b-button
            >
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Step1 from '@/components/customer/CreateStep1.vue'
import Step2 from '@/components/customer/CreateStep2.vue'
import Step3 from '@/components/customer/CreateStep3.vue'

export default {
  layout: 'customer',
  components: {
    Step1,
    Step2,
    Step3
  },
  computed: {
    stepsLength() {
      return this.NumberOfSteps.length
    },
    isLastStep() {
      return this.activeStep === this.stepsLength
    },
    isFirstStep() {
      return this.activeStep === 1
    },
    activeComponent(){
      return this.NumberOfSteps[this.activeStep - 1]
    }
  },
  data() {
    return {
      form: {
        name: '',
        customerType: '',
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters: [],
        defaultSecurityRoleModel: 'securityRole',
        modules: [],
        dbName: '',
        emailDomain: '',
        masterCustomers: [],
        code:'',
        contact:'',
        subDomain: ''
      },
      activeStep: 1,
      NumberOfSteps: ['Step1', 'Step2', 'Step3'],
      progress:{
        value: 0,
        max: 100,
        variant: 'warning'
      },
      canProceed:false,
      canSubmit:false
    }
  },
  methods: {
    nextStep() {
      this.activeStep++
      this.progress.value = this.progress.value + 33.333
    },
    previousStep() {
      this.activeStep--
      this.progress.value = this.progress.value - 33.333
    },
    cancelStep() {
      this.activeStep = 1
      this.progress.value = 0
      // this.form.name = '';
      // this.form.customerType =  '';
      // this.form.allowsAutomaticSignup = false;
      // this.form.automaticSignUpEmailDomainFilters = [];
      // this.form.defaultSecurityRoleModel = 'securityRole';
      // this.form.modules = [];
      // this.form.dbName = '';
      // this.form.emailDomain = '';
      // this.form.masterCustomers = [];
      // this.form.code = '';
      // this.form.contact = '';
      // this.form.subDomain = '';
    },
    mergeFormData({data, isValid}){
      this.form = { ...this.form, ...data }
      this.canProceed = isValid
      this.canSubmit = isValid
    },
    submit(){
      this.progress.variant = 'success'
      this.progress.value = 100;
      setTimeout(() => {
        this.$store.dispatch('managedService/postNewCustomer', this.form)
       }, 500);
    }
  }
}
</script>

<style scoped>
.card {
  margin: 15px;
  min-height: 490px;
}
.footer {
  background: #fff;
  border: 1px solid #ccc;
  height: 58px;
  padding: 15px;
  /* position: sticky;
    bottom: 0; */
}
</style>
