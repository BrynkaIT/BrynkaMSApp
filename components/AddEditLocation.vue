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
    <b-card bg-variant="light locationCard">
      <b-card-title>{{ formToOpen.title }}</b-card-title>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div>
            <b-form-group>
              <b-form-input
                v-model="location.name"
                size="sm"
                :class="{ 'validation-error': $v.location.name.$error }"
                @blur="$v.location.name.$touch()"
                placeholder="Name"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div>
            <b-form-group>
              <b-form-input
                v-model="location.street1"
                size="sm"
                placeholder="Street"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div>
            <b-form-group>
              <b-form-input
                v-model="location.street2"
                size="sm"
                type="text"
                placeholder="Apt/Suite"
              ></b-form-input>
            </b-form-group>
          </div>
          <b-row>
            <b-col sm>
              <b-form-group>
                <b-form-input
                  size="sm"
                  v-model="location.city"
                  type="text"
                  placeholder="City"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm>
              <b-form-group>
                <b-form-select
                  size="sm"
                  type="text"
                  v-model="location.state"
                  :options="states"
                  ref="statesInput"
                  text-field="name"
                  value-field="abbreviation"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm>
              <b-form-group>
                <b-form-input
                  size="sm"
                  type="text"
                  v-model="location.postalCode"
                  placeholder="Zip"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row style="float:right">
            <b-button type="reset" class="mr-1" size="sm" v-if="!formToOpen.from"
              >Reset</b-button
            >
            <b-button
            @click="$store.commit('switchForm',{ title:`Add ${formToOpen.from}`, to:'contact', from:'location'})"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary" size="sm"
              >Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
// import usaStates from '@/static/js/usaStates.json'

export default {

  computed: {
    ...mapState({
      locations: state => state.locations.locations,
      formToOpen: state => state.formToOpen,
      usaStates: state =>state.usStates.usaStates
    })

  },
  data() {
    return {
      location: {
        id:'',
        name: '',
        street1: '',
        street2: '',
        city: '',
        state: null,
        postalCode: ''
      },
      message: {
        text: '',
        variant: ''
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      show: true,
      isLocationToEdit: false,
      states: [{ name: 'State' }]
    }
  },
  validations: {
    location: {
      name: {
        required
      }
    }
  },
  created() {
    this.fetchUSAStates()
    if (this.formToOpen.data) {
      this.fetchLocationToEdit(this.formToOpen.data)
    }
  },
   activated() {
  //  if(this.formToOpen.data){
  //    this.building.locationId = this.formToOpen.data.locationId
  //    this.disableLocation = true
  //   }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$v.location.name.$touch()
      if (!this.$v.location.name.$invalid) {
        if (this.isLocationToEdit) {
          return this.onUpdate()
        }
        this.$store
          .dispatch('locations/postLocation', this.location)
          .then(location => {
            this.$emit('refreshLocations')
            this.showAlert(location.message, 'success')
            this.onReset()
            if (this.formToOpen.from) {
              this.$store.dispatch('locations/getLocations')
              this.$store.commit('switchForm',{
                title: this.formToOpen.title,
                to: this.formToOpen.from,
                from: 'location',
                isInternalContact: this.formToOpen.isInternalContact,
                data:location
              })
              setTimeout(() => { this.$emit('hideModal', false) }, 1000)
            }else{
              setTimeout(() => { this.$store.commit('closeModal') }, 1200)
            }
          })
          .catch(e =>this.showAlert(e.data.message, 'danger'))
      } else {
        this.showAlert('Please fill in required field(s)', 'danger')
      }
    },
    onUpdate() {
      this.$store
        .dispatch('locations/putLocation', this.location)
        .then(l => {
          this.$emit('refreshLocations')
          this.showAlert(l.message, 'success')
          this.onReset()
           setTimeout(() => { this.$store.commit('closeModal') }, 1000)
        })
        .catch(e => {
          this.showAlert(e.data.message, 'danger')
        })
    },
    onReset(evt) {
      this.location.name = ''
      this.location.street1 = ''
      this.location.street2 = ''
      this.location.city = ''
      this.location.state = null
      this.location.postalCode = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.location.$reset()
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
    fetchUSAStates() {
      this.usaStates.forEach(state => {
        this.states.push(state)
      })
    },
    fetchLocationToEdit(formData) {
      this.location.id = formData._id
      this.location.name = formData.name
      this.location.street1 = formData.address.street1
      this.location.street2 = formData.address.street2
      this.location.city = formData.address.city
      this.location.state = formData.address.state
      this.location.postalCode = formData.address.postalCode
      this.isLocationToEdit = true
    }
  }
}
</script>

<style scoped>
.locationCard{
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
