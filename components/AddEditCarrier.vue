<template>
  <div class="container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="message.variant"
      @dismiss-count-down="countDownChanged"
    >
      {{ message.text }}
    </b-alert>
    <b-card bg-variant="light carrierCard">
      <b-card-title>{{ formToOpen.title }}</b-card-title>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div>
            <b-form-group
            label-size="sm"
            label="Name"
            label-cols-sm="2"
            label-cols-lg="1"
            >
              <b-form-input
                v-model="carrier.name"
                size="sm"
                :class="{ 'validation-error': $v.carrier.name.$error }"
                @blur="$v.carrier.name.$touch()"

                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group
            label-size="sm"
            label="Code"
            label-cols-sm="2"
            label-cols-lg="1"
            >
              <b-form-input
                size="sm"
                v-model="carrier.code"
                class="mb-3"
                :class="{ 'validation-error': $v.carrier.code.$error }"
                @blur="$v.carrier.code.$touch()"

                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <b-row style="float:right">
            <b-button
              @click="$store.commit('closeModal')"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from != 'contact'"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary" size="sm">Submit</b-button>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'

export default {
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      carrier: {
        id:'',
        name: '',
        code: null
      },
      message: {
        text: '',
        variant: ''
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      show: true,
      isCarrierToEdit: false
    }
  },
  validations: {
    carrier: {
      name: {
        required
      },
      code: {
        required
      }
    }
  },
  created() {

    if(this.formToOpen.data){
      this.fetchCarrierToEdit(this.formToOpen.data)
    }
  },

  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$v.carrier.name.$touch()
      if (!this.$v.carrier.$invalid) {
        if (this.isCarrierToEdit) {
          return this.onUpdate()
        }
        this.$store
          .dispatch('carriers/postCarrier', this.carrier)
          .then(carrier => {
            this.$emit('refreshCarriers')
            this.showAlert(carrier.message, 'success')
            this.onReset()
            if (this.formToOpen.from) {
                this.$store.dispatch('carriers/getCarriers')
                this.$store.commit('switchForm',{
                title: this.formToOpen.title,
                to: this.formToOpen.from,
                from: 'carrier',
                data:carrier
              })
              setTimeout(() => { this.$emit('hideModal', false) }, 1000)
            }else{
              setTimeout(() => { this.$store.commit('closeModal') }, 1200)
            }
          })
          .catch(e => { this.showAlert(e.data.message, 'danger')})
      } else {
        this.showAlert('Please fill in required field(s)', 'danger')
      }
    },
    onUpdate() {
      this.$store
        .dispatch('carriers/putCarrier', this.carrier)
        .then(carrier => {
          this.$emit('refreshCarriers')
          this.showAlert(carrier.message, 'success')
          this.onReset()
          setTimeout(() => { this.$store.commit('closeModal') }, 1000)
        })
        .catch(e => { this.showAlert(e.data.message, 'danger') })
    },

    onReset(evt) {
      this.carrier.name = ''
      this.carrier.code = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.carrier.$reset()
      })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(message, variant) {
      this.message.text = message
      this.message.variant = variant
      this.dismissCountDown = this.dismissSecs
    },
    fetchCarrierToEdit(formData) {
      this.carrier.id = formData._id
      this.carrier.code = formData.code
      this.carrier.name = formData.name
      this.isCarrierToEdit = true
    }
  }
}
</script>

<style>
.carrierCard {
  max-width: 700px;
  margin: auto;
}
.error-text {
  display: block;
  color: red;
  font-size: 12px;
  font-style: italic;
  text-align: center;
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
</style>
